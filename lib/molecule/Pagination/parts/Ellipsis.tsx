import { DotsThreeIcon } from '@phosphor-icons/react';
import { DropdownMenu as FrostedDropdownMenu, IconButton } from '@radix-ui/themes';
import styles from '../Pagination.module.css';

interface IEllipsisProps {
  pages: number[];
  setPage: (page: number) => void;
}

const Ellipsis = ({ pages, setPage }: IEllipsisProps) => {
  return (
    <FrostedDropdownMenu.Root>
      <FrostedDropdownMenu.Trigger>
        <IconButton
          variant="outline"
          color="gray"
          aria-label="More pages"
          className={styles.button}
        >
          <DotsThreeIcon weight="bold" />
        </IconButton>
      </FrostedDropdownMenu.Trigger>
      <FrostedDropdownMenu.Content size="2" variant="soft">
        {pages.map((p) => (
          <FrostedDropdownMenu.Item key={p} onClick={() => setPage(p)}>
            {p}
          </FrostedDropdownMenu.Item>
        ))}
      </FrostedDropdownMenu.Content>
    </FrostedDropdownMenu.Root>
  );
};

export default Ellipsis;
