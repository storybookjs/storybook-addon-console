import React from 'react';
import { configure, addDecorator, addParameters } from '@storybook/react';
import { create } from '@storybook/theming';

import brandImage from '../docs/logo.svg';
import { setConsoleOptions } from '../src';

const theme = create({
  base: 'dark',

  colorPrimary: 'red',
  colorSecondary: '#58487b',
  brandTitle: 'Addon Console',
  brandUrl: 'https://github.com/storybookjs/storybook-addon-console',
  brandImage,
  appContentBg: '#251f33',
  appBg: '#6d608a',
  barBg: '#3b3152',
  barSelectedColor: 'white',
  background: { content: 'red' },

  addonActionsTheme: {
    // ...chromeLight,
    // BASE_FONT_FAMILY: typography.fonts.mono,
    BASE_BACKGROUND_COLOR: 'black',
  },
});

const panelExclude = setConsoleOptions({}).panelExclude;
setConsoleOptions({
  panelExclude: [...panelExclude, /deprecated/],
});

function loadStories() {
  require('./index.stories.js');
}

addParameters({
  options: {
    theme,
  },
  backgrounds: [{ name: 'default', value: '#e7e2f3', default: true }],
});

configure(loadStories, module);
