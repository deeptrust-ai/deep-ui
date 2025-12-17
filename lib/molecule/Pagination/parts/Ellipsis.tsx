import { Button as FrostedButton, DropdownMenu as FrostedDropdownMenu } from '@radix-ui/themes';

interface IEllipsisProps {
  pages: number[];
  setPage: (page: number) => void;
}

const Ellipsis = ({ pages, setPage }: IEllipsisProps) => {
  return (
    <FrostedDropdownMenu.Root>
      <FrostedDropdownMenu.Trigger>
        <FrostedButton variant="ghost" color="gray" aria-label="More pages">
          &hellip;
        </FrostedButton>
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
