import React from 'react';
import { Section as RadixSection } from '@radix-ui/themes';

export type SectionProps = React.ComponentPropsWithoutRef<typeof RadixSection>;

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
