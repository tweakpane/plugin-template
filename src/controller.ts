import {ValueController} from 'tweakpane/lib/common/controller/value';
import {Value} from 'tweakpane/lib/common/model/value';
import {ViewProps} from 'tweakpane/lib/common/model/view-props';
import {constrainRange} from 'tweakpane/lib/common/number-util';
import {
	PointerHandler,
	PointerHandlerEvent,
} from 'tweakpane/lib/common/view/pointer-handler';
import {bindDisposed} from 'tweakpane/lib/common/view/reactive';

import {PluginView} from './view';

interface Config {
	value: Value<number>;
	viewProps: ViewProps;
}

// Custom controller class should implement `ValueController` interface
export class PluginController implements ValueController<number> {
	public readonly value: Value<number>;
	public readonly view: PluginView;
	public readonly viewProps: ViewProps;

	constructor(doc: Document, config: Config) {
		this.onPoint_ = this.onPoint_.bind(this);

		// Receive the bound value from the plugin
		this.value = config.value;

		// and also view props
		this.viewProps = config.viewProps;
		bindDisposed(this.viewProps, () => {
			// Called when the controller is disposing
			console.log('TODO: dispose controller');
		});

		// Create a custom view
		this.view = new PluginView(doc, {
			value: this.value,
			viewProps: this.viewProps,
		});

		// You can use `PointerHandler` to handle pointer events in the same way as Tweakpane do
		const ptHandler = new PointerHandler(this.view.element);
		ptHandler.emitter.on('down', this.onPoint_);
		ptHandler.emitter.on('move', this.onPoint_);
		ptHandler.emitter.on('up', this.onPoint_);
	}

	private onPoint_(ev: PointerHandlerEvent) {
		const data = ev.data;
		if (!data.point) {
			return;
		}

		// Update the value by user input
		const dx =
			constrainRange(data.point.x / data.bounds.width + 0.05, 0, 1) * 10;
		const dy = data.point.y / 10;
		this.value.rawValue = Math.floor(dy) * 10 + dx;
	}
}
