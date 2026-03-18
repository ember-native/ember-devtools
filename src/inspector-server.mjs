import express from 'express';
#!/usr/bin/env node

import { createServer } from 'http';
import { Server } from 'socket.io';
import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Creates and starts an Ember Inspector server
 * @param {Object} options - Server configuration
 * @param {number} options.port - Port to listen on (default: 9229)
 * @param {string} options.host - Host to bind to (default: 'localhost')
 * @param {boolean} options.verbose - Enable verbose logging (default: false)
 * @returns {Object} Server instance with stop method
 */
export function createInspectorServer(options = {}) {
  const {
    port = process.env.PORT || 9229,
    host = process.env.HOST || 'localhost',
    verbose = false
  } = options;

  const app = express();
  const httpServer = createServer(app);
  const io = new Server(httpServer, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST']
    }
  });

  // Try to serve ember-inspector UI from node_modules
  console.log('dirname', __dirname);
  const inspectorPath = path.resolve(require.resolve('ember-inspector/ember-cli-build.js'), '..', 'dist', 'websocket');
  
  // Middleware to inject WebSocket setup into index.html
  app.get('/', (req, res, next) => {
    const fs = require('fs');
    const indexPath = path.join(inspectorPath, 'index.html');
    
    fs.readFile(indexPath, 'utf8', (err, html) => {
      if (err) {
        return next(err);
      }
      
      // Create the WebSocket client wrapper script
      const wsScript = `
    <script src="/socket.io/socket.io.js"></script>
    <script>
      (function() {
        // Connect to the inspector server as UI client
        const socket = io({
          query: { type: 'ui' }
        });
        
        // Create EventEmitter-like wrapper for Socket.IO
        const socketWrapper = {
          _listeners: {},
          
          on: function(eventName, callback) {
            if (!this._listeners[eventName]) {
              this._listeners[eventName] = [];
              
              // Set up Socket.IO listener
              socket.on(eventName, (data) => {
                this._listeners[eventName].forEach(cb => cb(data));
              });
            }
            this._listeners[eventName].push(callback);
          },
          
          removeAllListeners: function(eventName) {
            if (eventName) {
              delete this._listeners[eventName];
              socket.off(eventName);
            } else {
              Object.keys(this._listeners).forEach(name => {
                socket.off(name);
              });
              this._listeners = {};
            }
          },
          
          emit: function(eventName, data) {
            socket.emit(eventName, data);
          }
        };
        
        // Set up the global config for Ember Inspector
        window.EMBER_INSPECTOR_CONFIG = {
          remoteDebugSocket: socketWrapper
        };
        
        console.log('Ember Inspector WebSocket client initialized');
      })();
    </script>
`;
      
      // Replace the {{ remote-port }} placeholder with our script
      const modifiedHtml = html.replace('{{ remote-port }}', wsScript);
      
      res.setHeader('Content-Type', 'text/html');
      res.send(modifiedHtml);
    });
  });
  
  app.use(express.static(inspectorPath));

  // Store connections
  const connections = {
    ui: null,
    app: null
  };

  const log = (...args) => {
    if (verbose) {
      console.log('[Inspector Server]', ...args);
    }
  };

  io.on('connection', (socket) => {
    const clientType = socket.handshake.query.type;
    log(`Client connected: ${socket.id} (type: ${clientType})`);

    if (clientType === 'ui') {
      connections.ui = socket;
      console.log('✅ Inspector UI connected');
    } else if (clientType === 'app') {
      connections.app = socket;
      console.log('✅ Ember app connected');
    }

    // Forward emberInspectorMessage between UI and app
    socket.on('emberInspectorMessage', (message) => {
      log(`Message from ${clientType}:`, message.type);

      if (clientType === 'ui' && connections.app) {
        connections.app.emit('emberInspectorMessage', message);
      } else if (clientType === 'app' && connections.ui) {
        connections.ui.emit('emberInspectorMessage', message);
      } else {
        log(`Cannot forward message - ${clientType === 'ui' ? 'app' : 'ui'} not connected`);
      }
    });

    socket.on('disconnect', () => {
      log(`${clientType} disconnected`);
      if (clientType === 'ui') {
        connections.ui = null;
        console.log('⚠️  Inspector UI disconnected');
      }
      if (clientType === 'app') {
        connections.app = null;
        console.log('⚠️  Ember app disconnected');
      }
    });

    socket.on('error', (error) => {
      console.error(`❌ Socket error (${clientType}):`, error);
    });
  });

  return new Promise((resolve, reject) => {
    httpServer.listen(port, host, (err) => {
      if (err) {
        reject(err);
        return;
      }

      console.log('');
      console.log('🔍 Ember Inspector Server');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log(`📡 Server running at: http://${host}:${port}`);
      console.log(`🌐 Inspector UI: http://${host}:${port}`);
      console.log(`🔌 WebSocket: ws://${host}:${port}`);
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('');
      console.log('Waiting for connections...');
      console.log('');

      resolve({
        server: httpServer,
        io,
        stop: () => {
          return new Promise((resolve) => {
            io.close();
            httpServer.close(() => {
              console.log('Server stopped');
              resolve();
            });
          });
        }
      });
    });
  });
}

createInspectorServer({ verbose: true }).catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
