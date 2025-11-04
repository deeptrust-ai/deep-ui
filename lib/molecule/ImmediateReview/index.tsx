import { ListChecksIcon } from '@phosphor-icons/react';
import { Link, Text } from 'frosted-ui';

const ImmediateReview = () => {
  return (
    <div>
      <div>
        <Text>
          <ListChecksIcon />
          Requires Immediate Attention!
        </Text>
        <Link href="#">View All</Link>
      </div>
    </div>
  );
};

export default ImmediateReview;
