import React from 'react';
import { Grid as RadixGrid } from '@radix-ui/themes';

export type GridProps = React.ComponentPropsWithoutRef<typeof RadixGrid>;

const Grid = React.forwardRef<HTMLDivElement, GridProps>((props, ref) => {
  return (
    <RadixGrid ref={ref} {...props}>
      {props.children}
    </RadixGrid>
  );
});

Grid.displayName = 'Grid';

export { Grid };
export default Grid;
