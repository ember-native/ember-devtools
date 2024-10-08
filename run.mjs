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

const hash = 'abb728f8afc6a86cc66b1313f5056728ce422ddd'

const scraper = new Scraper({
    urls: [
      `https://chrome-devtools-frontend.appspot.com/serve_file/@${hash}/inspector.html`,
      `https://chrome-devtools-frontend.appspot.com/serve_file/@${hash}/devtools_app.html`,
      `https://chrome-devtools-frontend.appspot.com/serve_file/@${hash}/core/i18n/locales/en-US.json`,
      `https://chrome-devtools-frontend.appspot.com/serve_file/@${hash}/models/trace/lantern/metrics/metrics.js`,
      `https://chrome-devtools-frontend.appspot.com/serve_file/@${hash}/third_party/codemirror.next/chunk/codemirror.js`,
    ],
    directory: './download',
    filenameGenerator: 'bySiteStructure',
    plugins: [       
      new MyPlugin()
    ]
});


await scraper.scrape();

