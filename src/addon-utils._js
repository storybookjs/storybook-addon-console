export const initAddonOptions = defaultOptions => ({
  globalOptions: defaultOptions,
  localOptions: {},
  isGlobalScope: true,

  setOptions(options) {
    if (this.isGlobalScope) {
      this.globalOptions = {
        ...this.globalOptions,
        ...options,
      };
      return this.globalOptions;
    }
    this.localOptions = {
      ...this.localOptions,
      ...options,
    };
    return this.localOptions;
  },

  getOptions() {
    return this.isGlobalScope ? this.globalOptions : this.localOptions;
  },

  globalScope() {
    this.isGlobalScope = true;
    this.localOptions = {};
  },

  localScope() {
    this.isGlobalScope = false;
    this.localOptions = {};
  },
});

export const catchLocalOptions = addonOptions => (storyFn, context) => {
  addonOptions.localScope();
  const story = storyFn(context);
  const { localOptions, globalOptions } = addonOptions;
  addonOptions.globalScope();
  return { story, localOptions, globalOptions };
};
