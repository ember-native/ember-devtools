import path from 'path';
import { defineConfig } from 'vite';
import commonjs from '@rollup/plugin-commonjs';



module.exports = defineConfig({
  build: {
    commonjsOptions: {
      defaultIsModuleExports: false
    },
    lib: {
      entry: path.resolve(__dirname, 'devtools.js'),
      name: 'devtools',
      fileName: (format) => `devtools.${format}.js`
    }
  },
  optimizeDeps: {
    exclude: ['selenium-webdriver']
  },
  plugins: [commonjs({
    dynamicRequireTargets: [
      'node_modules/selenium-webdriver/lib/atoms/*'
    ]
  })]
});