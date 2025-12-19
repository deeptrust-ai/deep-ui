import { Table as RadixTable } from '@radix-ui/themes';

const TableEmpty = ({ colSpan }: { colSpan: number }) => {
  return (
    <RadixTable.Row>
      <RadixTable.Cell colSpan={colSpan}>No data available</RadixTable.Cell>
    </RadixTable.Row>
  );
};

export default TableEmpty;
