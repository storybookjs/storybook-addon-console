[![npm version](https://badge.fury.io/js/%40storybook%2Faddon-console.svg)](https://badge.fury.io/js/%40storybook%2Faddon-console)
[![Live demo](https://img.shields.io/badge/Live%20Demo-%20Storybook-brightgreen.svg)](https://storybooks.github.io/storybook-addon-console)

# Storybook Addon Console

Redirects console output into Action Logger Panel

## Why

There're some cases when you can't / don't want / forgot to keep browser console opened. This addon helps you to get all console output in your storybook. In other cases, you might find it difficult to extract the desired information in the information noise issued by the console or to determine which component in what state gives the message. With this addon, you can control **what** you see and **where** you see.

We assume the following possible applications:

- Mobile devices. You might want to make console output reachable for users when they need to work with your storybook from mobile browsers

- Small screens. You can save your screen space keeping browser console closed

- To filter your console output. You can independently configure both action logger and real console output in a wide range.

- To associate console messages with a specific components/stories. You can see which story emits which message

- To output some data into Action Logger from your deep components without importing `addon-actions` for that.

[![storybook-addon-console](https://raw.githubusercontent.com/storybooks/storybook-addon-console/master/docs/storybook-addon-console.png)](#)

### Install

```shell
npm i @storybook/addon-console --save-dev
```

### Quick Start

Just import it in your storybook config.js:

```js
// config.js

import '@storybook/addon-console';
```

That's all. You'll start to receive all console messages, warnings, errors in your action logger panel. Everything except HMR logs. If you want to enable HMR messages, do the following:

```js
// config.js

import { setConsoleOptions } from '@storybook/addon-console';

setConsoleOptions({
  panelExclude: [],
});
```

You'll receive console outputs as a `console`, `warn` and `error` actions in the panel. You might want to know from what stories they come. In this case, add `withConsole` decorator:

```js
// config.js

import { addDecorator } from '@storybook/react';
import { withConsole } from '@storybook/addon-console';

addDecorator((storyFn, context) => withConsole()(storyFn)(context));
```

After that your messages in Action Logger will be prefixed with the story path, like `molecules/atoms/electron: ["ComponentDidMount"]` or `molecules/atoms/electron error: ["Warning: Failed prop type..."]`. You can setup addon behavior by passing options to `withConsole` or `setConsoleOptions` methods, both have the same API.


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
import { storiesOf } from '@storybook/react';
import { withConsole } from '@storybook/addon-console';

storiesOf('withConsole', module)
 .addDecorator((storyFn, context) => withConsole()(storyFn)(context))
 .add('with Log', () => <Button onClick={() => console.log('Data:', 1, 3, 4)}>Log Button</Button>)
 .add('with Warning', () => <Button onClick={() => console.warn('Data:', 1, 3, 4)}>Warn Button</Button>)
 .add('with Error', () => <Button onClick={() => console.error('Test Error')}>Error Button</Button>)
 .add('with Uncatched Error', () =>
   <Button onClick={() => console.log('Data:', T.buu.foo)}>Throw Button</Button>
 )
 // Action Logger Panel:
 // withConsole/with Log: ["Data:", 1, 3, 4]
 // withConsole/with Warning warn: ["Data:", 1, 3, 4]
 // withConsole/with Error error: ["Test Error"]
 // withConsole/with Uncatched Error error: ["Uncaught TypeError: Cannot read property 'foo' of undefined", "http://localhost:9009/static/preview.bundle.js", 51180, 42, Object]
```
<a name="module_@storybook/addon-console..addonOptions"></a>

### @storybook/addon-console~addonOptions : <code>Object</code>
This options could be passed to [withConsole](#storybookaddon-consolewithconsoleoptionsorfn--function) or [setConsoleOptions](#module_@storybook/addon-console.setConsoleOptions)

**Kind**: inner typedef of [<code>@storybook/addon-console</code>](#module_@storybook/addon-console)  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| [panelExclude] | <code>Array.&lt;RegExp&gt;</code> | <code>[/[HMR]/]</code> | Optional. Anything matched to at least one of regular expressions will be excluded from output to Action Logger Panel |
| [panelInclude] | <code>Array.&lt;RegExp&gt;</code> | <code>[]</code> | Optional. If set, only matched outputs will be shown in Action Logger. Higher priority than `panelExclude`. |
| [consoleExclude] | <code>Array.&lt;RegExp&gt;</code> | <code>[]</code> | Optional. Anything matched to at least one of regular expressions will be excluded from DevTool console output |
| [consoleInclude] | <code>Array.&lt;RegExp&gt;</code> | <code>[]</code> | Optional. If set, only matched outputs will be shown in console. Higher priority than `consoleExclude`. |
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
addDecorator((storyFn, context) => withConsole(optionsCallback)(storyFn)(context));
```


## Contributing

`npm start` runs example Storybook. Then you can edit source code located in the `src` folder and example storybook in the `stories` folder.

### Run tests

Run `npm run test`. It starts jest test in `watch` mode.

### Test coverage

After running tests you can explore coverage details in `.coverage/lcov-report/index.html`

### Debugging

If you're using VSCode you can debug tests and source by launching `Jest Tests` task from Debug Menu. It allows to set breakpoints in `*.test.js` and `*.js` files.

### Readme editing

Please, don't edit this `README.md` directly. Run `npm run dev:docs` and change `docs/readme.hbs` and JSDoc comments withing `src` instead.

## Credits

<div align="left" style="height: 16px;">Created with ❤︎ to <b>React</b> and <b>Storybook</b> by <a href="http://t.me/usulpro">@usulpro</a>  [<a href="https://github.com/react-theming">React Theming</a>]
<sub>
<p>
https://twitter.com/UsulPro
</p>
<p>
https://www.linkedin.com/in/oleg-proskurin-76784453/
</p>
</sub>
</div>
