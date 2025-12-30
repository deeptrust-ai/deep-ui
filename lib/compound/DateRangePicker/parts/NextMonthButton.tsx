import { CaretLeftIcon, CaretRightIcon } from '@phosphor-icons/react';
import { Box, IconButton } from '@radix-ui/themes';
import type { NextMonthButtonProps } from 'react-day-picker';

const NextMonthButton = (props: NextMonthButtonProps) => {
  const isNext = props.className?.includes('next') ?? false;

  return (
    <Box px="1">
      <IconButton
        aria-label="Next Month"
        disabled={props.disabled}
        size="1"
        onClick={props.onClick}
        variant="surface"
        color="indigo"
      >
        {isNext ? <CaretRightIcon size={14} /> : <CaretLeftIcon size={14} />}
      </IconButton>
    </Box>
  );
};

export default NextMonthButton;
