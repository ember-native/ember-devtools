// ============================================================================
// EXAMPLE 1: Starting the Inspector Server
// ============================================================================

import { createInspectorServer } from './inspector-server.js';

// Start server with default options
const server = await createInspectorServer();

// Or with custom options
const customServer = await createInspectorServer({
  port: 9230,
  host: '0.0.0.0',  // Listen on all interfaces
  verbose: true      // Enable detailed logging
});

// Stop server when done
// await server.stop();


// ============================================================================
// EXAMPLE 2: Setting Up Ember App (Browser Environment)
// ============================================================================

import { setupEmberInspector, loadEmberDebug } from './setup-inspector.js';

// In your Ember app's boot sequence
async function bootEmberApp() {
  // ... your Ember app initialization ...
  
  // Set up inspector connection
  const inspector = setupEmberInspector({
    serverUrl: 'http://localhost:9229',
    appName: 'My Ember App',
    verbose: true
  });

  // Load ember_debug after Ember boots
  loadEmberDebug();

  // Optional: disconnect later
  // inspector.disconnect();
}


// ============================================================================
// EXAMPLE 3: Setting Up Ember App (Node.js Environment)
// ============================================================================

import { setupEmberInspector } from './setup-inspector.js';

// For Node.js Ember apps (SSR, FastBoot, etc.)
function setupNodeEmberApp() {
  // Set up inspector
  const inspector = setupEmberInspector({
    serverUrl: process.env.INSPECTOR_URL || 'http://localhost:9229',
    appName: process.env.APP_NAME || 'Ember SSR App',
    autoConnect: true,
    verbose: process.env.NODE_ENV === 'development'
  });

  // The inspector will automatically connect
  // ember_debug will be loaded when available
  
  return inspector;
}


// ============================================================================
// EXAMPLE 4: Complete Setup with Error Handling
// ============================================================================

async function setupInspectorWithErrorHandling() {
  try {
    // Start server
    const server = await createInspectorServer({
      port: process.env.INSPECTOR_PORT || 9229,
      verbose: true
    });

    console.log('Inspector server started successfully');

    // Set up client
    const inspector = setupEmberInspector({
      serverUrl: `http://localhost:${process.env.INSPECTOR_PORT || 9229}`,
      appName: 'My App'
    });

    // Handle process termination
    process.on('SIGINT', async () => {
      console.log('\nShutting down...');
      inspector.disconnect();
      await server.stop();
      process.exit(0);
    });

    return { server, inspector };
  } catch (error) {
    console.error('Failed to set up inspector:', error);
    process.exit(1);
  }
}


// ============================================================================
// EXAMPLE 5: Using with Express App
// ============================================================================

import express from 'express';
import { createInspectorServer } from './inspector-server.js';

async function setupWithExpress() {
  // Your existing Express app
  const app = express();
  
  // ... your routes ...

  // Start your app
  const appServer = app.listen(3000, () => {
    console.log('App running on http://localhost:3000');
  });

  // Start inspector server on different port
  const inspectorServer = await createInspectorServer({
    port: 9229
  });

  return { appServer, inspectorServer };
}


// ============================================================================
// EXAMPLE 6: Environment-Specific Configuration
// ============================================================================

const config = {
  development: {
    serverUrl: 'http://localhost:9229',
    verbose: true,
    autoConnect: true
  },
  staging: {
    serverUrl: 'http://staging-inspector.example.com',
    verbose: false,
    autoConnect: true
  },
  production: {
    // Don't enable inspector in production!
    serverUrl: null,
    verbose: false,
    autoConnect: false
  }
};

function setupForEnvironment(env = 'development') {
  const envConfig = config[env];
  
  if (!envConfig.serverUrl) {
    console.log('Inspector disabled for this environment');
    return null;
  }

  return setupEmberInspector(envConfig);
}


// ============================================================================
// EXAMPLE 7: Testing Setup
// ============================================================================

import { createInspectorServer } from './inspector-server.js';
import { setupEmberInspector } from './setup-inspector.js';

async function testInspectorSetup() {
  console.log('Starting inspector server...');
  const server = await createInspectorServer({ verbose: true });

  console.log('Connecting client...');
  const inspector = setupEmberInspector({
    serverUrl: 'http://localhost:9229',
    verbose: true
  });

  // Wait for connection
  await new Promise(resolve => setTimeout(resolve, 1000));

  if (inspector.isConnected) {
    console.log('✅ Inspector setup successful!');
  } else {
    console.log('❌ Inspector setup failed');
  }

  // Cleanup
  inspector.disconnect();
  await server.stop();
}

// Run test
// testInspectorSetup();
