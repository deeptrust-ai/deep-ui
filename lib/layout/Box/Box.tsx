import { Box as RadixBox } from '@radix-ui/themes';
import React from 'react';
import type { BoxProps } from './types';

const Box = React.forwardRef<HTMLDivElement, BoxProps>((props, ref) => {
  return (
    <RadixBox ref={ref} {...props}>
      {props.children}
    </RadixBox>
  );
});

Box.displayName = 'Box';

export { Box };
export default Box;
