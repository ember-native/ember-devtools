import Esm from './../path-containers/esm.js';
import { union, getUrl, series, updateResourceEncoding } from '../../utils/index.js';
import logger from '../../logger.js';

class JSResourceHandler {
	constructor (options, methods) {
		this.options = options;
		this.downloadChildrenPaths = methods.downloadChildrenPaths;
		this.updateChildrenPaths = methods.updateChildrenPaths;

		this.recursiveSources = this.options.recursiveSources || [];
		this.downloadSources = this.options.sources;
		this.updateSources = [];

		if (this.options.updateMissingSources === true) {
			this.updateSources = this.downloadSources;
		} else if (Array.isArray(this.options.updateMissingSources)) {
			this.updateSources = this.options.updateMissingSources;
		}

		this.allSources = union(this.downloadSources, this.updateSources);
	}

	async handle (resource) {
		updateResourceEncoding(resource, 'utf8');
		const pathContainer = new Esm(resource.getText());

		const updatedText = await this.downloadChildrenPaths(pathContainer, resource, this.updateMissingSources);
		resource.setText(updatedText);
    return resource;
	}
}



export default JSResourceHandler;
