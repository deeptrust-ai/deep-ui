import { Text } from 'frosted-ui';
import styles from './styles.module.css';

const Chip = ({ label }: { readonly label: string }) => {
  return (
    <span className={styles.chip}>
      <Text size="0" weight="medium">
        {label}
      </Text>
    </span>
  );
};

export default Chip;
