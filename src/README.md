# Implementation Guide

This directory contains the complete implementation for the Ember Inspector WebSocket server.

## Files

1. **inspector-server.js** - Socket.IO relay server (~130 lines)
2. **setup-inspector.js** - Ember app setup helper (~120 lines)

## Installation

### 1. Install Dependencies

```bash
# In your project root
npm install express socket.io socket.io-client ember-inspector
```

### 2. Start the Inspector Server

```bash
# Copy inspector-server.js to your project
cp .github/implementation/inspector-server.js ./

# Run the server
node inspector-server.js
```

Or use it programmatically:

```javascript
import { createInspectorServer } from './inspector-server.mjs';

const server = await createInspectorServer({
  port: 9229,
  host: 'localhost',
  verbose: true
});

// Later, to stop:
await server.stop();
```

### 3. Set Up Your Ember App

```javascript
// Copy setup-inspector.js to your project
import { setupEmberInspector, loadEmberDebug } from './setup-inspector.js';

// After your Ember app boots
setupEmberInspector({
  serverUrl: 'http://localhost:9229',
  appName: 'My Ember App',
  verbose: true
});

// Load ember_debug (if in browser environment)
loadEmberDebug();
```

## Usage

### Starting Everything

**Terminal 1: Start Inspector Server**
```bash
node inspector-server.js
```

**Terminal 2: Start Your Ember App**
```bash
# Your Ember app should call setupEmberInspector() on boot
node your-ember-app.js
```

**Browser: Open Inspector UI**
```
http://localhost:9229
```

## Expected Output

### Server Console
```
🔍 Ember Inspector Server
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📡 Server running at: http://localhost:9229
🌐 Inspector UI: http://localhost:9229
🔌 WebSocket: ws://localhost:9229
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Waiting for connections...

✅ Ember app connected
✅ Inspector UI connected
```

### Ember App Console
```
[Ember Inspector] Connecting to inspector server at http://localhost:9229...
✅ Connected to Ember Inspector server
✅ Ember Inspector debug loaded
```

## Configuration

### Server Options

```javascript
createInspectorServer({
  port: 9229,           // Port to listen on
  host: 'localhost',    // Host to bind to
  verbose: false        // Enable verbose logging
});
```

### Client Options

```javascript
setupEmberInspector({
  serverUrl: 'http://localhost:9229',  // Inspector server URL
  appName: 'My App',                   // App name for identification
  autoConnect: true,                   // Auto-connect on setup
  verbose: false                       // Enable verbose logging
});
```

## Environment Variables

- `PORT` - Server port (default: 9229)
- `HOST` - Server host (default: localhost)
- `INSPECTOR_URL` - Inspector server URL for client (default: http://localhost:9229)

## Troubleshooting

### Server won't start
- Check if port 9229 is already in use
- Try a different port: `PORT=9230 node inspector-server.js`

### App won't connect
- Verify server is running
- Check serverUrl matches server address
- Check firewall settings

### Inspector UI won't load
- Verify ember-inspector is installed: `npm list ember-inspector`
- Check browser console for errors
- Verify server is serving static files from correct path

### No data in Inspector
- Verify ember_debug is loaded (check browser console)
- Verify `window.EMBER_INSPECTOR_CONFIG.remoteDebugSocket` is set
- Check that Ember app has booted before calling setupEmberInspector

## Integration with Existing Projects

### For FastBoot/SSR Apps

```javascript
// In your FastBoot app
import { setupEmberInspector } from './setup-inspector.js';

// After FastBoot initializes
setupEmberInspector({
  serverUrl: process.env.INSPECTOR_URL || 'http://localhost:9229'
});
```

### For Custom Node.js Runtimes

```javascript
// In your custom runtime
import { setupEmberInspector } from './setup-inspector.js';

// Set up global environment
global.EMBER_INSPECTOR_CONFIG = {
  remoteDebugSocket: null  // Will be set by setupEmberInspector
};

// After Ember loads
setupEmberInspector();
```

## Next Steps

1. Test with your Ember app
2. Customize server/client as needed
3. Add authentication if needed
4. Deploy to production (with proper security)

## Security Considerations

⚠️ **Important**: This implementation is for development only!

For production use:
- Add authentication (tokens, API keys)
- Use HTTPS/WSS
- Restrict CORS origins
- Add rate limiting
- Use environment-specific configuration

## Support

For issues or questions:
- Check the REVISED_ARCHITECTURE.md for design details
- Review ember-inspector documentation
- Check Socket.IO documentation
