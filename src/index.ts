import {TemplateInputPlugin} from 'plugin';
import Tweakpane from 'tweakpane';

{
	// Register the plugin to Tweakpane
	Tweakpane.registerPlugin({
		// type: The plugin type.
		// - 'input': Input binding
		// - 'monitor': Monitor binding
		type: 'input',

		// plugin: Configurations of the plugin.
		plugin: TemplateInputPlugin,
	});
}
