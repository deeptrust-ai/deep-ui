import React from 'react';
import { Box as RadixBox } from '@radix-ui/themes';

export type BoxProps = React.ComponentPropsWithoutRef<typeof RadixBox>;

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
