/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';

interface ReactDecoratorProps {
  story: React.ReactNode;
  onMount: Function;
  onUnMount: Function;
}

class ReactDecorator extends React.Component<ReactDecoratorProps> {
  constructor(props: ReactDecoratorProps) {
    super(props);
    this.props.onMount();
  }
  componentWillUnmount() {
    this.props.onUnMount();
  }
  render() {
    return this.props.story;
  }
}
export default ReactDecorator;

export function reactStory(
  story: ReactDecoratorProps['story'],
  onMount: ReactDecoratorProps['onMount'],
  onUnMount: ReactDecoratorProps['onUnMount']
) {
  return <ReactDecorator story={story} onMount={onMount} onUnMount={onUnMount} />;
}
