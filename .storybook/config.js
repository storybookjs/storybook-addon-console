import React from 'react';
import { configure, addDecorator } from '@storybook/react';
import { setOptions } from '@storybook/addon-options';
import { setConsoleOptions } from '../src';

setOptions({
  name: 'Addon Console',
  url: 'https://github.com/storybooks/storybook-addon-console',
});

const panelExclude = setConsoleOptions({}).panelExclude;
setConsoleOptions({
  panelExclude: [...panelExclude, /deprecated/],
});

function loadStories() {
  require('../stories/index.stories.js');
}

configure(loadStories, module);
