import Filter from '../../ui/Filter';
import SortBy from '../../ui/SortBy';
import TableOperations from '../../ui/TableOperations';

import { Discount, Sort } from '../../utils/enums';
import { Option } from '../../utils/types';

function CabinTableOperations() {
  const filterOptions: Option[] = [
    { label: 'All', value: Discount.All },
    { label: 'No discount', value: Discount.NoDiscount },
    { label: 'With discount', value: Discount.WithDiscount },
  ];

  const sortOptions: Option[] = [
    { label: 'Sort by name (A-Z)', value: Sort.NameAsc },
    { label: 'Sort by name (Z-A)', value: Sort.NameDesc },
    { label: 'Sort by price (low first)', value: Sort.RegularPriceAsc },
    { label: 'Sort by price (high first)', value: Sort.RegularPriceDesc },
    { label: 'Sort by capacity (low first)', value: Sort.MaxCapacityAsc },
    { label: 'Sort by capacity (high first)', value: Sort.MaxCapacityDesc },
  ];

  return (
    <TableOperations>
      <Filter filterField='discount' options={filterOptions} />
      <SortBy options={sortOptions} />
    </TableOperations>
  );
}

export default CabinTableOperations;
