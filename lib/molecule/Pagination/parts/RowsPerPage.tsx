import { Text as RadixText, Select as RadixSelect } from '@radix-ui/themes';
import { PAGE_SIZE_OPTIONS } from '../constants';
import type { TPaginationItemsPerPage } from '../types';

interface IRowsPerPageProps {
  itemsPerPage: TPaginationItemsPerPage;
  onChange: (rowsPerPage: TPaginationItemsPerPage) => void;
}

const RowsPerPage = ({ itemsPerPage, onChange }: IRowsPerPageProps) => {
  return (
    <>
      <RadixText size="3" color="gray">
        Show
      </RadixText>
      <RadixSelect.Root value={itemsPerPage} size="3" onValueChange={onChange}>
        <RadixSelect.Trigger variant="surface" aria-label="Rows Showing Per Page" />
        <RadixSelect.Content>
          {PAGE_SIZE_OPTIONS.map((size) => (
            <RadixSelect.Item key={size} value={size}>
              {size}
            </RadixSelect.Item>
          ))}
        </RadixSelect.Content>
      </RadixSelect.Root>
    </>
  );
};

export default RowsPerPage;
