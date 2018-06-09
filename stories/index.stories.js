/* eslint-disable no-console */

import React from 'react';
import PropTypes from 'prop-types';

import { storiesOf } from '@storybook/react';
import { linkTo } from '@storybook/addon-links';

import { Button, Welcome } from '@storybook/react/demo';
import { withConsole } from '../src';

const T = {
  foo: 11,
};

class Badge extends React.Component {
  constructor(props) {
    super(props);
    console.log('Badge constructor');
  }
  render() {
    console.log('Badge render');
    return (
      <div>
        {this.props.info}
      </div>
    );
  }
}
Badge.propTypes = {
  info: PropTypes.number.isRequired,
};

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

storiesOf('Button', module)
  .add('with Log', () => <Button onClick={() => console.log('Data:', 1, 3, 4)}>Log Button</Button>)
  .add('with Warning', () =>
    <Button onClick={() => console.warn('Data:', 1, 3, 4)}>Warn Button</Button>
  )
  .add('with Error', () =>
    <Button onClick={() => console.error('Test Error')}>Error Button</Button>
  )
  .add('with Uncatched Error', () =>
    <Button onClick={() => console.log('Data:', T.buu.foo)}>Throw Button</Button>
  )
  .add('with wrong PropType', () => <Badge info="Component with React Warning" />);

const addConsole = (storyFn, context) => withConsole()(storyFn)(context);
storiesOf('withConsole', module)
  // .addDecorator((storyFn, context) => withConsole()(storyFn)(context))
  .addDecorator(addConsole)
  .add('with Log', () => <Button onClick={() => console.log('Data:', 1, 3, 4)}>Log Button</Button>)
  .add('with Warning', () =>
    <Button onClick={() => console.warn('Data:', 1, 3, 4)}>Warn Button</Button>
  )
  .add('with Error', () =>
    <Button onClick={() => console.error('Test Error')}>Error Button</Button>
  )
  .add('with Uncatched Error', () =>
    <Button onClick={() => console.log('Data:', T.buu.foo)}>Throw Button</Button>
  )
  .add('with log in costructor', () => <Badge info={42} />)
  .add('with wrong PropType', () => <Badge info="Component with React Warning" />);
