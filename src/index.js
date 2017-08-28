import window from 'global/window';
import { action } from '@storybook/addon-actions';

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

function globalScope(options) {
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

globalScope(addonOptions);

export function setConsoleOptions(optionsOrFn) {
  if (typeof optionsOrFn === 'object') {
    const newOptions = {
      ...addonOptions,
      ...optionsOrFn,
    };
    globalScope(newOptions);
    return newOptions;
  }
  const newOptions = { ...optionsOrFn(addonOptions) };
  globalScope(newOptions);
  return newOptions;
}
