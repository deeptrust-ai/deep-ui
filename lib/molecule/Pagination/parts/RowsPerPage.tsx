import { Text as FrostedText, Select as FrostedSelect } from '@radix-ui/themes';
import { PAGE_SIZE_OPTIONS } from '../constants';
import type { TPaginationItemsPerPage } from '../types';

interface IRowsPerPageProps {
  itemsPerPage: TPaginationItemsPerPage;
  onChange: (rowsPerPage: TPaginationItemsPerPage) => void;
}

const RowsPerPage = ({ itemsPerPage, onChange }: IRowsPerPageProps) => {
  return (
    <>
      <FrostedText size="3" color="gray">
        Show
      </FrostedText>
      <FrostedSelect.Root value={itemsPerPage} size="3" onValueChange={onChange}>
        <FrostedSelect.Trigger variant="surface" aria-label="Rows Showing Per Page" />
        <FrostedSelect.Content>
          {PAGE_SIZE_OPTIONS.map((size) => (
            <FrostedSelect.Item key={size} value={size}>
              {size}
            </FrostedSelect.Item>
          ))}
        </FrostedSelect.Content>
      </FrostedSelect.Root>
    </>
  );
};

export default RowsPerPage;
