import { DotsThreeIcon } from '@phosphor-icons/react';
import { DropdownMenu as RadixDropdownMenu, IconButton } from '@radix-ui/themes';
import styles from '../Pagination.module.css';

interface IEllipsisProps {
  pages: number[];
  setPage: (page: number) => void;
}

const Ellipsis = ({ pages, setPage }: IEllipsisProps) => {
  return (
    <RadixDropdownMenu.Root>
      <RadixDropdownMenu.Trigger>
        <IconButton
          variant="outline"
          color="gray"
          aria-label="More pages"
          className={styles.button}
        >
          <DotsThreeIcon weight="bold" />
        </IconButton>
      </RadixDropdownMenu.Trigger>
      <RadixDropdownMenu.Content size="2" variant="soft">
        {pages.map((p) => (
          <RadixDropdownMenu.Item key={p} onClick={() => setPage(p)}>
            {p}
          </RadixDropdownMenu.Item>
        ))}
      </RadixDropdownMenu.Content>
    </RadixDropdownMenu.Root>
  );
};

export default Ellipsis;
