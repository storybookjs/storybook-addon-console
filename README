
<div align="center">
  <h1>
  <nobr>
    <a href="https://storybookjs.github.io/storybook-addon-console">
      <img src="https://github.com/storybookjs/storybook-addon-console/raw/master/docs/logo.png" alt="logo" height="140">
    </a>
    <img src="https://github.com/storybookjs/storybook-addon-console/raw/master/docs/title.png" alt="Storybook Addon Console">
    </nobr>
  </h1>

</div>

<br />

# Storybook Addon Console

[![npm
version](https://badge.fury.io/js/%40storybook%2Faddon-console.svg)](https://badge.fury.io/js/%40storybook%2Faddon-console)
[![addon-console](https://img.shields.io/npm/dt/@storybook/addon-console.svg)](https://github.com/storybooks/storybook-addon-console)
[![Storybook](https://raw.githubusercontent.com/storybookjs/storybook-addon-console/master/docs/storybook.svg?sanitize=true)](https://storybookjs.github.io/storybook-addon-console)


## Why

There're some cases when you can't / don't want / forgot to keep browser console opened. This addon helps you to get all
console output in your storybook. In other cases, you might find it difficult to extract the desired information in the
information noise issued by the console or to determine which component in what state gives the message. With this
addon, you can control **what** you see and **where** you see.

We assume the following possible applications:

- Mobile devices. You might want to make console output reachable for users when they need to work with your storybook
from mobile browsers

- Small screens. You can save your screen space keeping browser console closed

- To filter your console output. You can independently configure both action logger and real console output in a wide
range.

- To associate console messages with a specific components/stories. You can see which story emits which message

- To output some data into Action Logger from your deep components without importing `addon-actions` for that.

[![storybook-addon-console](https://raw.githubusercontent.com/storybooks/storybook-addon-console/master/docs/storybook-addon-console.png)](https://raw.githubusercontent.com/storybooks/storybook-addon-console/master/docs/storybook-addon-console.png)

try [live demo](https://storybookjs.github.io/storybook-addon-console)

### Install

```shell
yarn add -D @storybook/addon-console @storybook/addon-actions
```

### Quick Start

Just import it in your storybook config.js:

```js
// config.js

import '@storybook/addon-console';
```

That's all. You'll start to receive all console messages, warnings, errors in your action logger panel. Everything
except HMR logs.

If you want to enable HMR messages, do the following:

```js
// config.js

import { setConsoleOptions } from '@storybook/addon-console';

const panelExclude = setConsoleOptions({}).panelExclude;
setConsoleOptions({
  panelExclude: [...panelExclude, /deprecated/],
});
```

You'll receive console outputs as a `console`, `warn` and `error` actions in the panel. You might want to know from what
stories they come. In this case, add `withConsole` decorator:

```js
// preview.js

import type { Preview } from '@storybook/react';
import { withConsole } from '@storybook/addon-console';

const preview: Preview = {
  decorators: [(storyFn, context) => withConsole()(storyFn)(context)],
  // ...
};
```

After that your messages in Action Logger will be prefixed with the story path, like `molecules/atoms/electron:
["ComponentDidMount"]` or `molecules/atoms/electron error: ["Warning: Failed prop type..."]`. You can setup addon
behavior by passing options to `withConsole` or `setConsoleOptions` methods, both have the same API.

### Panel

Addon console don't have own UI panel to output logs, it use `addon-console` instead. Make sure that `main.js` contains this line:

```js
// main.js

export default {
  addons: [
    "@storybook/addon-actions/register",
  ],
};
```


## API
<a name="module_@storybook/addon-console"></a>

## @storybook/addon-console
It handles `console.log`, `console.warn`, and `console.error` methods and not catched errors. By default, it just reflects all console messages in the Action Logger Panel (should be installed as a peerDependency) except [HMR] logs.


* [@storybook/addon-console](#module_@storybook/addon-console)
    * _static_
        * [.setConsoleOptions(optionsOrFn)](#module_@storybook/addon-console.setConsoleOptions) ⇒ <code>addonOptions</code>
        * [.withConsole([optionsOrFn])](#module_@storybook/addon-console.withConsole) ⇒ <code>function</code>
    * _inner_
        * [~addonOptions](#module_@storybook/addon-console..addonOptions) : <code>Object</code>
        * [~optionsCallback](#module_@storybook/addon-console..optionsCallback) ⇒ <code>addonOptions</code>

<a name="module_@storybook/addon-console.setConsoleOptions"></a>

### @storybook/addon-console.setConsoleOptions(optionsOrFn) ⇒ <code>addonOptions</code>
Set addon options and returns a new one

**Kind**: static method of [<code>@storybook/addon-console</code>](#module_@storybook/addon-console)  
**See**

- addonOptions
- optionsCallback


| Param | Type |
| --- | --- |
| optionsOrFn | <code>addonOptions</code> \| <code>optionsCallback</code> | 

**Example**  
```js
import { setConsoleOptions } from '@storybook/addon-console';

const panelExclude = setConsoleOptions({}).panelExclude;
setConsoleOptions({
  panelExclude: [...panelExclude, /deprecated/],
});
```
<a name="module_@storybook/addon-console.withConsole"></a>

### @storybook/addon-console.withConsole([optionsOrFn]) ⇒ <code>function</code>
Wraps your stories with specified addon options.
If you don't pass {`log`, `warn`, `error`} in options argument it'll create them from context for each story individually. Hence you'll see from what exact story you got a log or error. You can log from component's lifecycle methods or within your story.

**Kind**: static method of [<code>@storybook/addon-console</code>](#module_@storybook/addon-console)  
**Returns**: <code>function</code> - wrappedStoryFn  
**See**

- [addonOptions](#storybookaddon-consolesetconsoleoptionsoptionsorfn--addonoptions)
- [optionsCallback](#storybookaddon-consoleoptionscallback--addonoptions)


| Param | Type |
| --- | --- |
| [optionsOrFn] | <code>addonOptions</code> \| <code>optionsCallback</code> | 

**Example**  
```js
import type { Meta, StoryObj } from '@storybook/react';
import { withConsole } from '@storybook/addon-console';

const meta: Meta<typeof Button> = {
  title: 'Example/Button',
  component: Button,
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    primary: true,
    label: 'Button',
    onClick: () => console.log(['Data:', 1, 3, 4]),
  },
};
 // Action Logger Panel:
 // withConsole/with Log: ["Data:", 1, 3, 4]
```
<a name="module_@storybook/addon-console..addonOptions"></a>

### @storybook/addon-console~addonOptions : <code>Object</code>
This options could be passed to [withConsole](#storybookaddon-consolewithconsoleoptionsorfn--function) or [setConsoleOptions](#module_@storybook/addon-console.setConsoleOptions)

**Kind**: inner typedef of [<code>@storybook/addon-console</code>](#module_@storybook/addon-console)  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| [panelExclude] | <code>[ &#x27;Array&#x27; ].&lt;RegExp&gt;</code> | <code>[/[HMR]/]</code> | Optional. Anything matched to at least one of regular expressions will be excluded from output to Action Logger Panel |
| [panelInclude] | <code>[ &#x27;Array&#x27; ].&lt;RegExp&gt;</code> | <code>[]</code> | Optional. If set, only matched outputs will be shown in Action Logger. Higher priority than `panelExclude`. |
| [consoleExclude] | <code>[ &#x27;Array&#x27; ].&lt;RegExp&gt;</code> | <code>[]</code> | Optional. Anything matched to at least one of regular expressions will be excluded from DevTool console output |
| [consoleInclude] | <code>[ &#x27;Array&#x27; ].&lt;RegExp&gt;</code> | <code>[]</code> | Optional. If set, only matched outputs will be shown in console. Higher priority than `consoleExclude`. |
| [log] | <code>string</code> | <code>&quot;console&quot;</code> | Optional. The marker to display `console.log` outputs in Action Logger |
| [warn] | <code>string</code> | <code>&quot;warn&quot;</code> | Optional. The marker to display warnings in Action Logger |
| [error] | <code>string</code> | <code>&quot;error&quot;</code> | Optional. The marker to display errors in Action Logger |

<a name="module_@storybook/addon-console..optionsCallback"></a>

### @storybook/addon-console~optionsCallback ⇒ <code>addonOptions</code>
This callback could be passed to [setConsoleOptions](setConsoleOptions) or [withConsole](withConsole)

**Kind**: inner typedef of [<code>@storybook/addon-console</code>](#module_@storybook/addon-console)  
**Returns**: <code>addonOptions</code> - - new [addonOptions](addonOptions)  

| Param | Type | Description |
| --- | --- | --- |
| currentOptions | <code>addonOptions</code> | the current [addonOptions](addonOptions) |

**Example**  
```js
import { withConsole } from `@storybook/addon-console`;

const optionsCallback = (options) => ({panelExclude: [...options.panelExclude, /Warning/]});
export default {
  title: 'Button',
  decorators: [withConsole(optionsCallback)],
};
```


## Contributing

`yarn storybook` runs example Storybook. Then you can edit source code located in the `src` folder and example storybook in
the `stories` folder.

### Run tests

Run `yarn test`.

### Run tests in watch mode

Run `yarn tdd`.

### Test coverage

After running tests you can explore coverage details in `.coverage/lcov-report/index.html`

### Debugging

If you're using VSCode you can debug tests and source by launching `Jest Tests` task from Debug Menu. It allows to set
breakpoints in `*.test.js` and `*.js` files.

### Readme editing

Please, don't edit this `README.md` directly. Run `yarn dev:docs` and change `docs/readme.hbs` and JSDoc comments
withing `src` instead.

## Credits

<div align="left" style="height: 16px;">Created with ❤︎ to <b>React</b> and <b>Storybook</b> by <a
    href="https://twitter.com/UsulPro">@usulpro</a> [<a href="https://github.com/react-theming">React Theming</a>]
</div>