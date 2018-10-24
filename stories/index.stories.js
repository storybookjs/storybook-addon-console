/* eslint-disable no-console */

import React from 'react';
import PropTypes from 'prop-types';

import { storiesOf } from '@storybook/react';

import { Button } from '@storybook/react/demo';
import welcome from '../docs/welcome';
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
    return <div>{this.props.info}</div>;
  }
}
Badge.propTypes = {
  info: PropTypes.number.isRequired,
};

storiesOf('Welcome', module).add('to Storybook Addon Console', () => welcome);

storiesOf('Button', module)
  // simple console.log may be located anywhere deep in the child component
  .add('with Log', () => <Button onClick={() => console.log('Data:', 1, 3, 4)}>Log Button</Button>)
  // simple console.warn may be located anywhere deep in the child component
  .add('with Warning', () => (
    <Button onClick={() => console.warn('Data:', 1, 3, 4)}>Warn Button</Button>
  ))
  // simple console.error may be located anywhere deep in the child component
  .add('with Error', () => (
    <Button onClick={() => console.error('Test Error')}>Error Button</Button>
  ))
  // any unhandled error from anywhere deep in the child component
  .add('with Uncatched Error', () => (
    <Button onClick={() => console.log('Data:', null.buu.foo)}>Throw Button</Button>
  ))
  // logs and warnings displayed as soon as a child component did Mount
  .add('with wrong PropType', () => <Badge info="Component with React Warning" />);

const addConsole = (storyFn, context) => withConsole()(storyFn)(context);
storiesOf('withConsole', module)
  // all messages prefixed with story name
  .addDecorator(addConsole)
  .add('with Log', () => <Button onClick={() => console.log('Data:', 1, 3, 4)}>Log Button</Button>)
  .add('with Warning', () => (
    <Button onClick={() => console.warn('Data:', 1, 3, 4)}>Warn Button</Button>
  ))
  .add('with Error', () => (
    <Button onClick={() => console.error('Test Error')}>Error Button</Button>
  ))
  .add('with Uncatched Error', () => (
    <Button onClick={() => console.log('Data:', T.buu.foo)}>Throw Button</Button>
  ))
  .add('with log in constructor', () => <Badge info={42} />)
  .add('with wrong PropType', () => <Badge info="Component with React Warning" />);
