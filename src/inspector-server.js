import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import path from 'path';
import { fileURLToPath } from 'url';

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
  const inspectorPath = path.join(__dirname, '../../../node_modules/ember-inspector/dist');
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

// If run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  createInspectorServer({ verbose: true }).catch((err) => {
    console.error('Failed to start server:', err);
    process.exit(1);
  });
}
