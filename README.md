# Tweakpane plugin template
Plugin template of an input binding for [Tweakpane][tweakpane].


# For plugin developers
TODO: Delete this section before publishing your plugin.


## Quick start
- Install dependencies:
  ```
  % npm install
  ```
- Build source codes and watch changes:
  ```
  % npm start
  ```
- Open `test/browser.html` to see the result.


## File structure
```
|- src
|  |- sass ............ Plugin CSS
|  |- index.ts ........ Entrypoint
|  |- plugin.ts ....... Plugin
|  |- controller.ts ... Controller for the custom view
|  `- view.ts ......... Custom view
|- dist ............... Compiled files
`- test
   `- browser.html .... Plugin labo
```


## Version compatibility

| Tweakpane | plugin-template |
| --------- | --------------- |
| 4.x       | [main](https://github.com/tweakpane/plugin-template/tree/main) |
| 3.x       | [v3](https://github.com/tweakpane/plugin-template/tree/v3) |


# For plugin users


## Installation


### Browser
```html
<script type="module">
  import {Pane} as Tweakpane from './tweakpane.min.js';
  import * as TweakpaneTemplatePlugin from './tweakpane-plugin-template.min.js';

  const pane = new Pane();
  pane.registerPlugin(TweakpaneTemplatePlugin);
</script>
```


### Package
```js
import {Pane} from 'tweakpane';
import * as TemplatePlugin from 'tweakpane-plugin-template';

const pane = new Pane();
pane.registerPlugin(TemplatePlugin);
```


## Usage
```js
const params = {
  prop: 3,
};

// TODO: Update parameters for your plugin
pane.addInput(params, 'prop', {
  view: 'dots',
}).on('change', (ev) => {
  console.log(ev.value);
});
```


[tweakpane]: https://github.com/cocopon/tweakpane/
