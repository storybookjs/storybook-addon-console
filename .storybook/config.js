import React from 'react';
import { configure, addDecorator } from '@storybook/react';
import { withOptions } from '@storybook/addon-options';
import { create } from '@storybook/theming';

import brandImage from '../docs/logo.svg';
import { setConsoleOptions } from '../src';

const theme = create({
  base: 'light',

  colorPrimary: 'red',
  colorSecondary: '#58487b',
  brandTitle: 'Addon Console',
  brandUrl: 'https://github.com/storybookjs/storybook-addon-console',
  brandImage,
});

addDecorator(
  withOptions({
    theme,
  })
);


const panelExclude = setConsoleOptions({}).panelExclude;
setConsoleOptions({
  panelExclude: [...panelExclude, /deprecated/],
});

function loadStories() {
  require('../stories/index.stories.js');
}

configure(loadStories, module);
