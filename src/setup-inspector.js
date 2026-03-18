import { io } from 'socket.io-client';
import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Sets up Ember Inspector for a Node.js Ember application
 * @param {Object} options - Configuration options
 * @param {string} options.serverUrl - Inspector server URL (default: 'http://localhost:9229')
 * @param {string} options.appName - Application name for identification
 * @param {boolean} options.autoConnect - Auto-connect on setup (default: true)
 * @param {boolean} options.verbose - Enable verbose logging (default: false)
 * @returns {Object} Inspector client with connect/disconnect methods
 */
export function setupEmberInspector(options = {}) {
  const {
    serverUrl = process.env.INSPECTOR_URL || 'http://localhost:9229',
    appName = 'Ember App',
    autoConnect = true,
    verbose = false
  } = options;

  const log = (...args) => {
    if (verbose) {
      console.log('[Ember Inspector]', ...args);
    }
  };

  let socket = null;
  let isConnected = false;

  const client = {
    connect() {
      if (socket) {
        log('Already connected');
        return socket;
      }

      log(`Connecting to inspector server at ${serverUrl}...`);

      // Create Socket.IO client
      socket = io(serverUrl, {
        query: { type: 'app' },
        reconnection: true,
        reconnectionDelay: 1000,
        reconnectionAttempts: 5
      });

      // Set up global config for ember-inspector
      if (typeof window !== 'undefined') {
        window.EMBER_INSPECTOR_CONFIG = {
          remoteDebugSocket: socket,
          appName
        };
      } else if (typeof global !== 'undefined') {
        global.EMBER_INSPECTOR_CONFIG = {
          remoteDebugSocket: socket,
          appName
        };
      }

      socket.on('connect', () => {
        isConnected = true;
        console.log('✅ Connected to Ember Inspector server');
        log(`Socket ID: ${socket.id}`);
      });

      socket.on('disconnect', (reason) => {
        isConnected = false;
        console.log('⚠️  Disconnected from Ember Inspector server:', reason);
      });

      socket.on('connect_error', (error) => {
        console.error('❌ Failed to connect to Ember Inspector server:', error.message);
      });

      socket.on('emberInspectorMessage', (message) => {
        log('Received message:', message.type);
      });

      return socket;
    },

    disconnect() {
      if (socket) {
        log('Disconnecting from inspector server...');
        socket.disconnect();
        socket = null;
        isConnected = false;
        console.log('Disconnected from Ember Inspector server');
      }
    },

    get isConnected() {
      return isConnected;
    },

    get socket() {
      return socket;
    }
  };

  // Auto-connect if enabled
  if (autoConnect) {
    client.connect();
  }

  return client;
}

/**
 * Loads ember_debug for Node.js environment
 * This loads the websocket version of ember_debug from ember-inspector package
 * Call this after setupEmberInspector() and after Ember app has booted
 *
 * IMPORTANT: For Node.js environments, ember_debug must be loaded via require()
 * The file is located at: node_modules/ember-inspector/dist/websocket/ember_debug.js
 */
export async function loadEmberDebug() {
  try {
    let loaded = false;
    let lastError = null;

    try {
      await import('ember-inspector/dist/websocket/ember_debug.js');
      loaded = true;
    } catch (e) {
      lastError = e;
    }


    if (!loaded) {
      console.error('❌ Failed to load ember_debug. Make sure ember-inspector is installed.');
      console.error('   Try: npm install ember-inspector');
      if (lastError) {
        console.error('   Last error:', lastError.message);
      }
    }
  } catch (error) {
    console.error('❌ Error loading ember_debug:', error);
  }
}

// Export for convenience
export default setupEmberInspector;
