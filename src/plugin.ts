import {InputParams} from 'tweakpane/lib/blade/common/api/types';
import {BindingTarget} from 'tweakpane/lib/common/binding/target';
import {CompositeConstraint} from 'tweakpane/lib/common/constraint/composite';
import {
	createRangeConstraint,
	createStepConstraint,
} from 'tweakpane/lib/input-binding/number/plugin';
import {InputBindingPlugin} from 'tweakpane/lib/input-binding/plugin';

import {PluginController} from './controller';

// NOTE: You can see JSDoc comments of `InputBindingPlugin` for details about each property
//
// `InputBindingPlugin<In, Ex>` means...
// - The plugin receives the bound value as `Ex`,
// - converts `Ex` into `In` and holds it
//
export const TemplateInputPlugin: InputBindingPlugin<number, number> = {
	id: 'input-template',

	// This plugin template injects a compiled CSS by @rollup/plugin-replace
	// See rollup.config.js for details
	css: '__css__',

	accept(exValue: unknown, params: InputParams) {
		if (typeof exValue !== 'number') {
			// Return null to deny the user input
			return null;
		}

		// `view` option may be useful to provide a custom control for primitive values
		if (params.view !== 'dots') {
			return null;
		}

		// Return a typed value to accept the user input
		return exValue;
	},

	binding: {
		reader(_args) {
			return (exValue: unknown): number => {
				// Convert an external unknown value into the internal value
				return typeof exValue === 'number' ? exValue : 0;
			};
		},

		constraint(args) {
			// Create a value constraint from the user input
			const constraints = [];
			// You can reuse existing functions of the default plugins
			const cr = createRangeConstraint(args.params);
			if (cr) {
				constraints.push(cr);
			}
			const cs = createStepConstraint(args.params);
			if (cs) {
				constraints.push(cs);
			}
			// Use `CompositeConstraint` to combine multiple constraints
			return new CompositeConstraint(constraints);
		},

		equals: (inValue1: number, inValue2: number) => {
			// Simply use `===` to compare primitive values,
			// or a custom comparator for complex objects
			return inValue1 === inValue2;
		},

		writer(_args) {
			return (target: BindingTarget, inValue) => {
				// Use `target.write()` to write the primitive value to the target,
				// or `target.writeProperty()` to write a property of the target
				target.write(inValue);
			};
		},
	},

	controller(args) {
		// Create a controller for the plugin
		return new PluginController(args.document, {
			value: args.value,
			viewProps: args.viewProps,
		});
	},
};
