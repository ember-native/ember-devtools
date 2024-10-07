import byTypeFilenameGenerator from '../filename-generator/by-type.js';

class GenerateFilenameByTypePlugin {
	apply (registerAction) {
		let occupiedFilenames, subdirectories, defaultFilename;

		registerAction('beforeStart', ({options}) => {
			occupiedFilenames = [];
			subdirectories = options.subdirectories;
			defaultFilename = options.defaultFilename;
		});
		registerAction('generateFilename', ({resource}) => {
			const filename = byTypeFilenameGenerator(resource, {subdirectories, defaultFilename}, occupiedFilenames);
			console.log('byTypeFilenameGenerator', filename);
			occupiedFilenames.push(filename);
			return {filename};
		});
	}
}

export default GenerateFilenameByTypePlugin;
