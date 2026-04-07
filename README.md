# ember-native-devtools

> Ember Inspector for Node.js environments using WebSocket

A lightweight Socket.IO-based server that enables [Ember Inspector](https://github.com/emberjs/ember-inspector) to work with Ember.js applications running in Node.js environments (SSR, FastBoot, custom runtimes).

## Features

- ✅ **No Browser Dependency** - Works with any Node.js Ember runtime
- ✅ **Simple Setup** - ~250 lines of code total
- ✅ **Uses Official ember-inspector** - No modifications needed
- ✅ **Full Feature Support** - All inspector features work
- ✅ **Easy Maintenance** - Update via `npm update ember-inspector`

## Architecture

```
Inspector UI (Browser) ↔ Socket.IO ↔ Relay Server ↔ Socket.IO ↔ Node.js Ember App
```

The server acts as a simple relay between the Ember Inspector UI (running in your browser) and your Node.js Ember application, using ember-inspector's built-in WebSocket adapter.

## Installation

```bash
npm install ember-native-devtools socket.io-client
```

## Quick Start

### 1. Start the Inspector Server

```bash
npx ember-inspector-server
```

Or programmatically:

```javascript
import { createInspectorServer } from 'ember-native-devtools/server';

const server = await createInspectorServer({
  port: 9230,
  host: 'localhost',
  verbose: true
});
```

### 2. Set Up Your Ember App

```javascript
import { setupEmberInspector, loadEmberDebug } from 'ember-native-devtools/client';

// After your Ember app boots
setupEmberInspector({
  serverUrl: 'http://localhost:9230',
  appName: 'My Ember App'
});

// Load ember_debug (loads node_modules/ember-inspector/dist/websocket/ember_debug.js)
loadEmberDebug();
```

### 3. Open Inspector UI

Open your browser to: `http://localhost:9230`

## Configuration

### Server Options

```javascript
createInspectorServer({
  port: 9230,           // Port to listen on (default: 9230)
  host: 'localhost',    // Host to bind to (default: 'localhost')
  verbose: false        // Enable verbose logging (default: false)
});
```

### Client Options

```javascript
setupEmberInspector({
  serverUrl: 'http://localhost:9230',  // Inspector server URL
  appName: 'My App',                   // App name for identification
  autoConnect: true,                   // Auto-connect on setup (default: true)
  verbose: false                       // Enable verbose logging (default: false)
});
```

## Environment Variables

- `PORT` - Server port (default: 9230)
- `HOST` - Server host (default: localhost)
- `INSPECTOR_URL` - Inspector server URL for client (default: http://localhost:9230)

## Examples

See [example-usage.js](src/example-usage.js) for complete examples including:
- Basic setup
- Express integration
- Environment-specific configuration
- Error handling
- Testing setup

## Documentation

- [Implementation Guide](src/README.md) - Complete usage guide
- [Architecture](.github/REVISED_ARCHITECTURE.md) - System design and architecture
- [Example Usage](src/example-usage.js) - Practical examples

## How It Works

1. **Inspector Server** - A Socket.IO server that serves the ember-inspector UI and relays messages
2. **Ember App Client** - Connects to the server and sets up `global.EMBER_INSPECTOR_CONFIG.remoteDebugSocket`
3. **ember_debug** - Loaded from `ember-inspector/dist/websocket/ember_debug.js` (built into ember-inspector)
4. **Inspector UI** - Connects to the server and communicates with your app

## Use Cases

- **FastBoot/SSR Apps** - Debug server-side rendered Ember applications
- **Custom Node.js Runtimes** - Inspect Ember apps in custom Node.js environments
- **Development Tooling** - Build development tools for non-browser Ember environments
- **Testing** - Inspect Ember apps during automated testing

## Troubleshooting

### Server won't start
- Check if port 9230 is already in use
- Try a different port: `PORT=9230 npx ember-inspector-server`

### App won't connect
- Verify server is running
- Check serverUrl matches server address
- Check firewall settings

### Inspector UI won't load
- Verify ember-inspector is installed: `npm list ember-inspector`
- Check browser console for errors

### No data in Inspector
- Verify ember_debug is loaded (check console for "✅ Ember Inspector debug loaded")
- Verify `global.EMBER_INSPECTOR_CONFIG.remoteDebugSocket` is set
- Check that Ember app has booted before calling setupEmberInspector

## Security

⚠️ **Important**: This implementation is for development only!

For production use:
- Add authentication (tokens, API keys)
- Use HTTPS/WSS
- Restrict CORS origins
- Add rate limiting
- Use environment-specific configuration

## Migration from v1.x

Version 2.0 is a complete rewrite that removes the Selenium/Chrome dependency:

**Old (v1.x):**
- Required Selenium WebDriver
- Required Chrome/Chromedriver
- Complex setup with bundled DevTools
- ~1000+ lines of code

**New (v2.x):**
- Pure Node.js with Socket.IO
- No browser dependencies
- Simple setup with ember-inspector's built-in WebSocket adapter
- ~250 lines of code

To migrate, simply update your package.json and follow the Quick Start guide above.

## Contributing

Contributions are welcome! Please see the [implementation guide](src/README.md) for details on the architecture.

## License

MIT

## Credits

- [Ember Inspector](https://github.com/emberjs/ember-inspector) - The official Ember debugging tool
- [Socket.IO](https://socket.io/) - Real-time bidirectional event-based communication

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for version history.
