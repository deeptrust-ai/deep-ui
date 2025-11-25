import React from 'react';
import { Section as RadixSection } from '@radix-ui/themes';
import type { SectionProps } from './types';

const Section = React.forwardRef<HTMLDivElement, SectionProps>((props, ref) => {
  return (
    <RadixSection ref={ref} {...props}>
      {props.children}
    </RadixSection>
  );
});

Section.displayName = 'Section';

export { Section };
export default Section;
