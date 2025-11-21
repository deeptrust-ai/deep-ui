import React from 'react';
import { Flex as RadixFlex } from '@radix-ui/themes';

export type FlexProps = React.ComponentPropsWithoutRef<typeof RadixFlex>;

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
