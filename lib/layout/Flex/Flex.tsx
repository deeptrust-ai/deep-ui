import React from 'react';
import { Flex as RadixFlex } from '@radix-ui/themes';
import type { FlexProps } from './types';

const Flex = React.forwardRef<HTMLDivElement, FlexProps>((props, ref) => {
  return (
    <RadixFlex ref={ref} {...props}>
      {props.children}
    </RadixFlex>
  );
});

Flex.displayName = 'Flex';

export { Flex };
export default Flex;
