/**
 * It handles `console.log`, `console.warn`, and `console.error` methods and not catched errors. By default, it just reflects all console messages in the Action Logger Panel (should be installed as a peerDependency) except [HMR] logs.
 * @module @storybook/addon-console
 *
 *
 */

import { global } from '@storybook/global';
import { action, configureActions } from '@storybook/addon-actions';

import { reactStory } from './react-decorator';

if (configureActions) {
  configureActions({
    clearOnStoryChange: false,
  });
}

const logger = console;
const cLogger = {
  log: logger.log.bind(logger),
  warn: logger.warn.bind(logger),
  error: logger.error.bind(logger),
};

/**
 * @typedef {Object} addonOptions - This options could be passed to [withConsole]{@link #storybookaddon-consolewithconsoleoptionsorfn--function} or [setConsoleOptions]{@link #module_@storybook/addon-console.setConsoleOptions}
 * @property {RegExp[]} [panelExclude = [/[HMR]/]] - Optional. Anything matched to at least one of regular expressions will be excluded from output to Action Logger Panel
 * @property {RegExp[]} [panelInclude = []] - Optional. If set, only matched outputs will be shown in Action Logger. Higher priority than `panelExclude`.
 * @property {RegExp[]} [consoleExclude = []] - Optional. Anything matched to at least one of regular expressions will be excluded from DevTool console output
 * @property {RegExp[]} [consoleInclude = []] - Optional. If set, only matched outputs will be shown in console. Higher priority than `consoleExclude`.
 * @property {string} [log = console] - Optional. The marker to display `console.log` outputs in Action Logger
 * @property {string} [warn = warn] - Optional. The marker to display warnings in Action Logger
 * @property {string} [error = error] - Optional. The marker to display errors in Action Logger
 */
const addonOptions = {
  panelExclude: [/\[HMR\]/],
  panelInclude: [],
  consoleExclude: [],
  consoleInclude: [],
  log: 'console',
  warn: 'warn',
  error: 'error',
};

let currentOptions = addonOptions;

const createLogger = options => ({
  log: action(options.log),
  warn: action(options.warn),
  error: action(options.error),
});

const shouldDisplay = (messages, exclude, include) => {
  if (include.length) {
    return messages.filter(mess =>
      typeof mess === 'string' ? include.find(regExp => mess.match(regExp)) : false
    );
  }
  if (exclude.length) {
    return messages.filter(mess =>
      typeof mess === 'string' ? !exclude.find(regExp => mess.match(regExp)) : true
    );
  }
  return messages;
};

function setScope(options) {
  const { panelExclude, panelInclude, consoleExclude, consoleInclude } = options;
  const aLogger = createLogger(options);

  logger.log = (...args) => {
    const toPanel = shouldDisplay(args, panelExclude, panelInclude);
    const toConsole = shouldDisplay(args, consoleExclude, consoleInclude);
    if (toPanel.length) aLogger.log(...toPanel);
    if (toConsole.length) cLogger.log(...toConsole);
  };

  logger.warn = (...args) => {
    const toPanel = shouldDisplay(args, panelExclude, panelInclude);
    const toConsole = shouldDisplay(args, consoleExclude, consoleInclude);
    if (toPanel.length) aLogger.warn(...toPanel);
    if (toConsole.length) cLogger.warn(...toConsole);
  };

  logger.error = (...args) => {
    const toPanel = shouldDisplay(args, panelExclude, panelInclude);
    const toConsole = shouldDisplay(args, consoleExclude, consoleInclude);
    if (toPanel.length) aLogger.error(...toPanel);
    if (toConsole.length) cLogger.error(...toConsole);
  };

  global.onerror = (...args) => {
    const toPanel = shouldDisplay([args[0]], panelExclude, panelInclude);
    const toConsole = shouldDisplay([args[0]], consoleExclude, consoleInclude);
    if (toPanel.length) aLogger.error(...args);
    if (toConsole.length) return false;

    return true;
  };
}

setScope(addonOptions);

const detectOptions = prop => {
  if (!prop) return {};
  if (typeof prop === 'object') {
    const newOptions = {
      // ...addonOptions, // remove
      ...prop,
    };
    return newOptions;
  }
  const newOptions = { ...prop(currentOptions) }; // check: should it be currentOptions?
  return newOptions;
};

/**
 * This callback could be passed to {@link setConsoleOptions} or {@link withConsole}
 *
 * @example
 * import { withConsole } from `@storybook/addon-console`;
 *
 * const optionsCallback = (options) => ({panelExclude: [...options.panelExclude, /Warning/]});
 * export default {
 *   title: 'Button',
 *   decorators: [withConsole(optionsCallback)],
 * };
 *
 * @callback optionsCallback
 * @param {addonOptions} currentOptions - the current {@link addonOptions}
 * @return {addonOptions} - new {@link addonOptions}
 */

/**
 * Set addon options and returns a new one
 * @param {addonOptions|optionsCallback} optionsOrFn
 * @return {addonOptions}
 * @see addonOptions
 * @see optionsCallback
 *
 * @example
import { setConsoleOptions } from '@storybook/addon-console';

const panelExclude = setConsoleOptions({}).panelExclude;
setConsoleOptions({
  panelExclude: [...panelExclude, /deprecated/],
});
 */
export function setConsoleOptions(optionsOrFn) {
  const newOptions = detectOptions(optionsOrFn);
  currentOptions = {
    ...currentOptions,
    ...newOptions,
  };
  setScope(currentOptions);
  return currentOptions;
}

function handleStoryLogs() {
  switch (global.STORYBOOK_ENV) {
    case 'react':
      return reactStory;
    default:
      logger.warn(
        `Warning! withConsole doesn't support @storybook/${global.STORYBOOK_ENV}. Use setConsoleOptions instead`
      );
      return story => story;
  }
}

function addConsole(storyFn, context, consoleOptions) {
  const prevOptions = { ...currentOptions };
  const logNames = context
    ? {
        log: `${context.kind}/${context.story}`,
        warn: `${context.kind}/${context.story}/warn`,
        error: `${context.kind}/${context.story}/error`,
      }
    : {};

  const options = {
    ...currentOptions,
    ...logNames,
    ...consoleOptions,
  };

  setScope(options);
  const story = storyFn();
  const wrapStory = handleStoryLogs();
  const wrappedStory = wrapStory(
    story,
    () => setScope(options),
    () => setScope(currentOptions)
  );

  currentOptions = prevOptions;
  setScope(currentOptions);
  return wrappedStory;
}

/**
 * Wraps your stories with specified addon options.
 * If you don't pass {`log`, `warn`, `error`} in options argument it'll create them from context for each story individually. Hence you'll see from what exact story you got a log or error. You can log from component's lifecycle methods or within your story.
 * @param {addonOptions|optionsCallback} [optionsOrFn]
 * @see [addonOptions]{@link #storybookaddon-consolesetconsoleoptionsoptionsorfn--addonoptions}
 * @see [optionsCallback]{@link #storybookaddon-consoleoptionscallback--addonoptions}
 * @return {function} wrappedStoryFn
 *
 * @example
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
 */
export function withConsole(optionsOrFn) {
  const newOptions = detectOptions(optionsOrFn);
  return storyFn => context => addConsole(storyFn, context, newOptions);
}
