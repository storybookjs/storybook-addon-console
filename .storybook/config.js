import React from 'react';
import ThemeProvider from '@emotion/provider';
import { configure, addDecorator } from '@storybook/react';
import { themes } from '@storybook/components';
import { withOptions } from '@storybook/addon-options';
import { setConsoleOptions } from '../src';

import 'react-chromatic/storybook-addon';

const theme = {...themes.normal,
  // mainBackground: '#4c4c4c',
  // mainFill: '#ababab',
  // barFill: '#4c4c4c',
  // barSelectedColor: 'white',
  // highlightColor: 'red'
  // mainTextColor: 'white'
  brand: {
    background: '#F1618C',
    color: 'white'
  }
}

addDecorator(
  withOptions({
    name: 'Addon Console',
    url: 'https://github.com/storybooks/storybook-addon-console',
    theme,
  })
  );
  console.log('TCL: themes.dark', theme);

addDecorator(
  (story, { kind }) =>
    kind === 'Core|Errors' ? (
      story()
    ) : (
      <ThemeProvider theme={themes.normal}>{story()}</ThemeProvider>
    )
);

const panelExclude = setConsoleOptions({}).panelExclude;
setConsoleOptions({
  panelExclude: [...panelExclude, /deprecated/],
});

function loadStories() {
  require('../stories/index.stories.js');
}

configure(loadStories, module);
