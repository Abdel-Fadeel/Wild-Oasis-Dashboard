import { useSearchParams } from 'react-router-dom';

import CabinRow from './CabinRow';
import Menus from '../../ui/Menus';
import Spinner from '../../ui/Spinner';
import Table from '../../ui/Table';

import { Cabin } from '../../utils/types';
import { Discount, Sort } from '../../utils/enums';
import useCabins from './useCabins';

function CabinTable() {
  const { isLoading, cabins } = useCabins();
  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;

  // Filter
  const filterValue = searchParams.get('discount') || Discount.All;

  let filteredCabins: Cabin[] = [];
  if (filterValue === Discount.All) filteredCabins = cabins || [];
  if (filterValue === Discount.NoDiscount)
    filteredCabins = cabins?.filter((cabin) => cabin.discount === 0) || [];
  if (filterValue === Discount.WithDiscount)
    filteredCabins = cabins?.filter((cabin) => cabin.discount > 0) || [];

  // Sort
  const sortBy = searchParams.get('sortBy') || Sort.NameAsc;
  const [field, direction] = sortBy.split('-') as [
    'name' | 'regularPrice' | 'maxCapacity',
    'asc' | 'desc'
  ];
  const modifier = direction === 'asc' ? 1 : -1;
  const sortedCabins = filteredCabins.sort((a, b) => {
    if (field === 'name') return a[field].localeCompare(b[field]) * modifier;
    if (field === 'regularPrice' || field === 'maxCapacity')
      return (a[field] - b[field]) * modifier;
    return -1;
  });

  return (
    <Menus>
      <Table columns='0.6fr 1.8fr 2.2fr 1fr 1fr 1fr'>
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body<Cabin>
          data={sortedCabins}
          render={(cabin: Cabin) => <CabinRow key={cabin.id} cabin={cabin} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
