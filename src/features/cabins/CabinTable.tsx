import { useSearchParams } from 'react-router-dom';

import CabinRow from './CabinRow';
import Menus from '../../ui/Menus';
import Spinner from '../../ui/Spinner';
import Table from '../../ui/Table';

import { Cabin } from '../../utils/types';
import { Discount } from '../../utils/enums';
import useCabins from './useCabins';

function CabinTable() {
  const { isLoading, cabins } = useCabins();
  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;

  const filterValue = searchParams.get('discount') || Discount.All;

  let filteredCabins: Cabin[] = [];
  if (filterValue === Discount.All) filteredCabins = cabins || [];
  if (filterValue === Discount.NoDiscount)
    filteredCabins = cabins?.filter((cabin) => cabin.discount === 0) || [];
  if (filterValue === Discount.WithDiscount)
    filteredCabins = cabins?.filter((cabin) => cabin.discount > 0) || [];

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
          data={filteredCabins}
          render={(cabin: Cabin) => <CabinRow key={cabin.id} cabin={cabin} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
