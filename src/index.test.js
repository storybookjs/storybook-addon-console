import React from 'react';

const consoleLog = jest.fn();
const consoleWarn = jest.fn();
const consoleError = jest.fn();

global.console = {
  log: consoleLog,
  warn: consoleWarn,
  error: consoleError,
};

const { withConsole, setConsoleOptions } = require('./');

const logger = console;

let aLogResults = {};

beforeEach(() => {
  aLogResults = {};
});

jest.mock('@storybook/addon-actions', () => ({
  action: msg => (...data) => {
    aLogResults = { msg, data };
  },
}));

describe('addon Console', () => {
  const logString = 'Storybook is awesome!';
  const logHMR = '[HMR] connected';

  describe('global scope', () => {
    describe('check options `setConsoleOptions`', () => {
      const addonOptions = {
        panelExclude: [/\[HMR\]/],
        panelInclude: [],
        consoleExclude: [],
        consoleInclude: [],
        log: 'console',
        warn: 'warn',
        error: 'error',
      };
      it('should return default options', () => {
        const defaultOptions = setConsoleOptions({});
        expect(defaultOptions).toEqual(addonOptions);
      });
      it('should set options as an object', () => {
        const option = { panelInclude: [/Data/] };
        const newOptions = setConsoleOptions(option);
        expect(newOptions).toEqual({ ...addonOptions, ...option });
      });
      it('should set options via function', () => {
        const setOption = option => ({
          ...option,
          consoleExclude: option.panelExclude,
          consoleInclude: option.consoleExclude,
        });
        const oldOptions = setConsoleOptions({});
        const newOptions = setConsoleOptions(setOption);
        expect(newOptions).toEqual({
          ...oldOptions,
          consoleExclude: oldOptions.panelExclude,
          consoleInclude: oldOptions.consoleExclude,
        });
        expect(newOptions).not.toBe(oldOptions);
      });
    });

    describe('default options', () => {
      const defaultOptions = setConsoleOptions({});

      beforeEach(() => {
        // reset options to default
        setConsoleOptions();
      });

      it('should output `console.log` to panel and console', () => {
        logger.log(logString);
        expect(aLogResults.msg).toBe(defaultOptions.log);
        expect(aLogResults.data).toEqual([logString]);
        expect(consoleLog.mock.calls[0]).toEqual([logString]);
      });

      it('should output HMR log to console but not to panel', () => {
        logger.log(logHMR);
        expect(aLogResults).toEqual({});
        expect(consoleLog.mock.calls[0]).toEqual([logHMR]);
      });

      it('should output `console.warn` to panel and console', () => {
        logger.warn(logString);
        expect(aLogResults.msg).toBe(defaultOptions.warn);
        expect(aLogResults.data).toEqual([logString]);
        expect(consoleWarn.mock.calls[0]).toEqual([logString]);
      });

      it('should output `console.error` to panel and console', () => {
        logger.error(logString);
        expect(aLogResults.msg).toBe(defaultOptions.error);
        expect(aLogResults.data).toEqual([logString]);
        expect(consoleError.mock.calls[0]).toEqual([logString]);
      });

      it('should catch error and output to panel and console', () => {
        const isCatched = global.window.onerror.call(global, logString, 'url', 2);
        expect(aLogResults.msg).toBe(defaultOptions.error);
        expect(aLogResults.data).toEqual([logString, 'url', 2]);
        expect(isCatched).toBe(false);
      });
    });

    describe('exclude HMR from console via `consoleExclude: [/[HMR]/]`', () => {
      beforeEach(() => {
        setConsoleOptions({ consoleExclude: [/\[HMR\]/] });
      });
      it('should catch error and not output anywhere', () => {
        const isCatched = global.window.onerror.call(global, logHMR, 'url', 2);
        expect(aLogResults).toEqual({});
        expect(isCatched).toBe(true);
      });
      it('should works with multiple args', () => {
        const multiLog = [logString, logHMR, 1, 77, 0, false, true, { foo: 'buu' }];
        logger.log(...multiLog);
        expect(aLogResults.data).toEqual([logString, 1, 77, 0, false, true, { foo: 'buu' }]);
        expect(consoleLog.mock.calls[0]).toEqual([
          logString,
          1,
          77,
          0,
          false,
          true,
          { foo: 'buu' },
        ]);
      });
    });

    describe('include only certain logs via `panelInclude: [/Component/]`', () => {
      beforeEach(() => {
        setConsoleOptions({ panelInclude: [/Component/] });
      });
      const specialLog = '<Component/>';
      it('should output <Component/> to console and to panel', () => {
        logger.log(specialLog);
        expect(aLogResults.data).toEqual([specialLog]);
        expect(consoleLog.mock.calls[0]).toEqual([specialLog]);
      });
      it('should not output anything else to panel', () => {
        logger.log(logString);
        expect(aLogResults).toEqual({});
        expect(consoleLog.mock.calls[0]).toEqual([logString]);
      });
      it('should log if it match to one of included patterns', () => {
        const include = [/(?!.*)/, /Storybook/];
        setConsoleOptions({ panelInclude: include, consoleInclude: include });
        logger.log(logString, logHMR);
        expect(aLogResults.data).toEqual([logString]);
        expect(consoleLog.mock.calls[0]).toEqual([logString]);
      });
    });

    describe('exclude everything via `...Include: [/(?!.*)/]`', () => {
      beforeEach(() => {
        setConsoleOptions({ panelInclude: [/(?!.*)/], consoleInclude: [/(?!.*)/] });
      });
      it('should not log anything at all', () => {
        logger.log(logString);
        expect(aLogResults).toEqual({});
        expect(consoleLog.mock.calls[0]).toBeUndefined();
      });
      it('should not warn anything at all', () => {
        logger.warn(logString);
        expect(aLogResults).toEqual({});
        expect(consoleLog.mock.calls[0]).toBeUndefined();
      });
      it('should not error anything at all', () => {
        logger.error(logString);
        expect(aLogResults).toEqual({});
        expect(consoleLog.mock.calls[0]).toBeUndefined();
      });
      it('should not log even objects', () => {
        const logObj = [1, 2, { foo: 'buu' }, [logString]];
        logger.log(logObj);
        expect(aLogResults).toEqual({});
        expect(consoleLog.mock.calls[0]).toBeUndefined();
      });
    });
  });

  describe('withConsole', () => {
    const storyFn = () => <div>Hello</div>;
    const context = {
      kind: 'StoryKind',
      story: 'JestStory',
    };

    it('should work withConsole', () => {
      const wrappedStory = withConsole()(storyFn)(context)
    });

  });
});
