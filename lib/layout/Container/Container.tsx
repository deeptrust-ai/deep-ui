import React from 'react';
import { Container as RadixContainer } from '@radix-ui/themes';
import type { ContainerProps } from './types';

const Container = React.forwardRef<HTMLDivElement, ContainerProps>((props, ref) => {
  return (
    <RadixContainer ref={ref} {...props}>
      {props.children}
    </RadixContainer>
  );
});

Container.displayName = 'Container';

export { Container };
export default Container;
