import { Text as FrostedText, Heading as FrostedHeading } from 'frosted-ui';
import type { IHeaderProps } from './types';
import styles from './styles.module.css';

export const Header = ({ title, subtitle, metaInfo, headerAs }: IHeaderProps) => {
  return (
    <div className={styles.header}>
      <FrostedText size="2" color="gray" as="p">
        {metaInfo}
      </FrostedText>
      <FrostedHeading size="6" as={headerAs}>
        {title}
      </FrostedHeading>
      <FrostedText size="2" color="gray" as="p">
        {subtitle}
      </FrostedText>
    </div>
  );
};

export default Header;
export type { IHeaderProps } from './types';
