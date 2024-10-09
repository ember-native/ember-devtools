

async function install() {
  const Host = await import('devtools://devtools/bundled/core/host/host.js');
  const { ThemeSupport } = await import('devtools://devtools/bundled/ui/legacy/theme_support/theme_support.js');

  // loadNetworkResource crashes chrome
  InspectorFrontendHost.loadNetworkResource = (...args) => console.log(...args);

  function injectChrome(themeName) {
    class ChromePort {
      constructor() {
        this.channel = new MessageChannel();
        this.listeners = [];
        this.channel.port1.addEventListener('message', (msg) => {
          this.listeners.forEach(l => l(msg.data));
        });
        this.channel.port1.start();
        window.parent.postMessage('openChannel', '*', [this.channel.port2]);
      }

      postMessage(options) {
        this.channel.port1.postMessage(options)
      }

      onDisconnect = {
        addListener() {

        }
      }
      onMessage = {
        addListener: (l) => {
          this.listeners.push(l);
        }
      }
    }

    let origin = window.location.origin;
    const chrome = window.chrome = {};
    chrome.devtools = {
      panels: {
        themeName: themeName
      },
      network: {
        onNavigated: {
          addListener() {

          }
        }
      },
      inspectedWindow: {
        tabId: 1,
        eval(code) {
          chrome.runtime._port.postMessage({
            'type': 'eval',
            'code': code
          });
        }
      }
    }
    Object.defineProperty(chrome, 'devtools', {
      value: chrome.devtools,
      writable: false
    })
    chrome.runtime = {
      connect() {
        this._port = new ChromePort();
        return this._port;
      },
      getURL(url) {
        return origin + url;
      }
    }
  }

  function buildInjection() {
    const themeName = ThemeSupport.instance().themeName();
    return `${injectChrome.toString()}(function(){ injectChrome('${themeName}') })`
  }


  const origin = 'chrome-extension://njaghcdncehohgfpoomdblcempkpmhin'
  const id = 'njaghcdncehohgfpoomdblcempkpmhin';
  const ext = {
    addEventListener(...args) {
      console.log(...args);
    },
    isAllowedOnTarget() {
      return true;
    },
    start() {
    },
    icon: 'panes-3-16-0/assets/svg/ember-icon.svg'
  }
  const extInfo = {
    command: 'createPanel',
    id: 'Ember',
    page: 'panes-3-16-0/index.html',
    title: 'Ember',
    icon: 'panes-3-16-0/assets/svg/ember-icon.svg'
  };

  Extensions.extensionServer.registeredExtensions.set(origin, ext);
  Extensions.extensionServer.registerExtension(origin, ext);
  Host.InspectorFrontendHost.InspectorFrontendHostInstance.setInjectedScriptForOrigin(origin, buildInjection());
  Extensions.extensionServer.onCreatePanel(extInfo, ext);


  function startCommunication(port) {
    port.addEventListener('message', async (event) => {
      console.log('ember inspector message', event)
      if (event.data?.type === 'inject-ember-debug') {
        const response = await fetch(event.data.value);
        const data = await response.text();
        event.data.value = data;
        event.data.type = 'inject-code';
      }
      if (event.data.type === 'eval') {
        const data = {
          "expression": event.data.code,
          "objectGroup": "console",
          "includeCommandLineAPI": true,
          "silent": false,
          "returnByValue": false,
          "generatePreview": true,
          "userGesture": true,
          "awaitPromise": false,
          "replMode": true,
          "allowUnsafeEvalBlockedByCSP": false,
        }
        ProtocolClient.test.sendRawMessage('Runtime.evaluate', data);
        return;
      }
      ProtocolClient.test.sendRawMessage('Ember.fromExtension', event.data);
    });
    ProtocolClient.test.onMessageReceived = (msg) => {
      console.log('onMessageReceived', msg);
      if (msg.method === 'Ember.toExtension') {
        console.log('msg', msg)
        port.postMessage(msg.params.data);
      }
    }
    port.start();
    window.commPort = port;
  }


  window.addEventListener('message', (event) => {
    if (event.origin === origin && event.data === 'openChannel') {
      startCommunication(event.ports[0]);
    }
  });
}

const i = setInterval(() => {
  if (Extensions.extensionServer && typeof DevToolsAPI !== 'undefined' && typeof InspectorFrontendHost !== 'undefined' && typeof DevToolsHost !== 'undefined') {
    void install();
    clearInterval(i);
  }
}, 1000);
