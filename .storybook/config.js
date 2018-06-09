import React from 'react';
import { configure, addDecorator } from '@storybook/react';
import { setConsoleOptions } from '../src';

const panelExclude = setConsoleOptions({}).panelExclude;
setConsoleOptions({
  panelExclude: [...panelExclude, /deprecated/],
});


function loadStories() {
  require('../stories/index.stories.js');
}

configure(loadStories, module);
