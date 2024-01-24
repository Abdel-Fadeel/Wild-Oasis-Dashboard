import Filter from '../../ui/Filter';
import TableOperations from '../../ui/TableOperations';

import { Discount } from '../../utils/enums';

function CabinTableOperations() {
  const options: { label: string; value: string }[] = [
    { label: 'All', value: Discount.All },
    { label: 'No discount', value: Discount.NoDiscount },
    { label: 'With discount', value: Discount.WithDiscount },
  ];

  return (
    <TableOperations>
      <Filter filterField='discount' options={options} />
    </TableOperations>
  );
}

export default CabinTableOperations;
