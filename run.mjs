import Scraper from './node-website-scraper/lib/scraper.js';
import PuppeteerPlugin from 'website-scraper-puppeteer';

class MyPlugin {
	apply(registerAction) {
		registerAction('error', async ({error}) => {console.error(error)});
		registerAction('beforeRequest', async ({resource, requestOptions}) => {
                  console.log(resource.getUrl());
                  return {requestOptions};
                });
	}
}

const scraper = new Scraper({
    urls: [
      'https://chrome-devtools-frontend.appspot.com/serve_file/@c82bbfc83a46869153a82ee063df4a7ee9718f8d/inspector.html',
      'https://chrome-devtools-frontend.appspot.com/serve_file/@c82bbfc83a46869153a82ee063df4a7ee9718f8d/devtools_app.html',
      'https://chrome-devtools-frontend.appspot.com/serve_file/@c82bbfc83a46869153a82ee063df4a7ee9718f8d/core/i18n/locales/en-US.json',
      'https://chrome-devtools-frontend.appspot.com/serve_file/@c82bbfc83a46869153a82ee063df4a7ee9718f8d/models/trace/lantern/metrics/metrics.js',
      'https://chrome-devtools-frontend.appspot.com/serve_file/@c82bbfc83a46869153a82ee063df4a7ee9718f8d/third_party/codemirror.next/chunk/codemirror.js',
    ],
    directory: './download',
    filenameGenerator: 'bySiteStructure',
    plugins: [       
      new MyPlugin()
    ]
});


await scraper.scrape();

