import logger from '../logger.js';
import {getUrl, prettifyFilename, getHashFromUrl} from '../utils/index.js';

import HtmlHandler from './html/index.js';
import CssHandler from './css/index.js';
import JsHandler from './js/index.js';

class ResourceHandler {
	constructor ({
		prettifyUrls, 
		sources, 
		recursiveSources, 
		maxRecursiveDepth, 
		defaultFilename, 
		updateMissingSources
	} = {}, {
		requestResource, 
		getReference
	} = {}) {

		this.options = {
			prettifyUrls, 
			sources, 
			recursiveSources, 
			maxRecursiveDepth, 
			defaultFilename, 
			updateMissingSources
		};
		this.requestResource = requestResource;
		this.getReference = getReference;

		const methods = {
			downloadChildrenPaths: this.downloadChildrenResources.bind(this),
			updateChildrenPaths: this.updateChildrenResources.bind(this)
		};

		this.htmlHandler = new HtmlHandler(this.options, methods);
		this.cssHandler = new CssHandler(this.options, methods);
    this.jsHandler = new JsHandler(this.options, methods);
	}

	getResourceHandler (resource) {
		switch (true) {
			case resource.isCss():
				logger.debug('using css handler for ' + resource);
				return this.cssHandler;
			case resource.isHtml():
				logger.debug('using html handler for ' + resource);
				return this.htmlHandler;
      case resource.isJs():
        logger.debug('using js handler for ' + resource);
				return this.jsHandler;
			default:
				logger.debug('using no handler for ' + resource);
				return null;
		}
	}

	/**
	 * Request all resources from pathContainers paths
	 * @param pathContainer - instance of ImgSrcsetTag or CommonTag or CssText, contains original paths for resources
	 * @param {Resource} parentResource
	 * @returns {Promise} - resolved when all resources from pathContainer were requested
	 * and original paths in parentResource were updated with local paths for children resources
	 */
	downloadChildrenResources (pathContainer, parentResource) {
		const self = this;
		const childrenPaths = pathContainer.getPaths();
		const pathsToUpdate = [];

		const childrenPromises = childrenPaths.map((childPath) => {
			const childResourceUrl = getUrl(parentResource.getUrl(), childPath);
			const childResource = parentResource.createChild(childResourceUrl);

			return self.requestResource(childResource).then(async (respondedResource) => {
				if (respondedResource) {
					parentResource.updateChild(childResource, respondedResource);
				}

				const { reference } = await self.getReference({parentResource, resource: respondedResource, originalReference: childPath});

				if (reference) {
					let relativePath = reference;

					if (self.options.prettifyUrls) {
						relativePath = prettifyFilename(relativePath, {defaultFilename: self.options.defaultFilename});
					}

					const hash = getHashFromUrl(childPath);
					if (hash) {
						relativePath = relativePath.concat(hash);
					}

					pathsToUpdate.push({ oldPath: childPath, newPath: relativePath});
				}
				return null;
			});
		});

		return Promise.allSettled(childrenPromises).then(function updateChildrenPaths () {
			return pathContainer.updateText(pathsToUpdate);
		});
	}

	async updateChildrenResources (pathContainer, parentResource) {
		const pathsToUpdate = [];

		for (let originalReference of pathContainer.getPaths()) {
			const { reference } = await this.getReference({parentResource, resource: null, originalReference});
			if (reference) {
				pathsToUpdate.push({ oldPath: originalReference, newPath: reference });
			}
		}

		return pathContainer.updateText(pathsToUpdate);
	}

	handleResource (resource) {
		const resourceHandler = this.getResourceHandler(resource);
		if (resourceHandler && resourceHandler.handle) {
			return resourceHandler.handle(resource);
		}
		return Promise.resolve(resource);
	}
}

export default ResourceHandler;
