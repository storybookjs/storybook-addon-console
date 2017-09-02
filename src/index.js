import React from 'react';
import window from 'global/window';
import { action } from '@storybook/addon-actions';

import ReactDecorator from './react-decorator';

const logger = console;
const cLogger = {
  log: logger.log,
  warn: logger.warn,
  error: logger.error,
};

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

/**
 * filters messages accordingly to include/exclude settings
 * @param {*} messages 
 * @param {*} exclude 
 * @param {*} include 
 */
const shouldDisplay = (messages, exclude, include) => {
  if (include.length) {
    return messages.filter(
      mess => (typeof mess === 'string' ? include.find(regExp => mess.match(regExp)) : false)
    );
  }
  if (exclude.length) {
    return messages.filter(
      mess => (typeof mess === 'string' ? !exclude.find(regExp => mess.match(regExp)) : true)
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

  window.onerror = (...args) => {
    const toPanel = shouldDisplay([args[0]], panelExclude, panelInclude);
    const toConsole = shouldDisplay([args[0]], consoleExclude, consoleInclude);
    if (toPanel.length) aLogger.error(...args);
    if (toConsole.length) return false;

    return true;
  };
}

setScope(addonOptions);

const detectOptions = prop => {
  if (!prop) return addonOptions;
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

export function setConsoleOptions(optionsOrFn) {
  const newOptions = detectOptions(optionsOrFn);
  currentOptions = {
    ...currentOptions,
    ...newOptions,
  };
  setScope(currentOptions);
  return currentOptions;
}

function addConsole(storyFn, context, consoleOptions) {
  const prevOptions = { ...currentOptions };
  const logNames = context
    ? {
        log: `${context.kind}/${context.story}`,
        warn: `${context.kind}/${context.story} warn`,
        error: `${context.kind}/${context.story} error`,
      }
    : {};

  const options = {
    ...currentOptions,
    ...logNames,
    ...consoleOptions,
  };

  setScope(options);
  const story = storyFn();
  const wrapedStory = (
    <ReactDecorator
      story={story}
      onMount={() => setScope(options)}
      onUnMount={() => setScope(currentOptions)}
    />
  );

  currentOptions = prevOptions;
  setScope(currentOptions);
  return wrapedStory;
}

export function withConsole(optionsOrFn) {
  const newOptions = detectOptions(optionsOrFn);
  return storyFn => context => addConsole(storyFn, context, {});
}
