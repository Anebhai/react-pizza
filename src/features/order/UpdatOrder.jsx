import { useFetcher } from 'react-router-dom';
import Button from '../../ui/Button';
import { updateOrder } from '../../services/apiRestaurant';

function UpdatOrder({ order }) {
  const fetcher = useFetcher();
  return (
    <fetcher.Form method="patch" className="text-right">
      <Button type="primary">Make Priority</Button>
    </fetcher.Form>
  );
}

export default UpdatOrder;

export async function action({ request, params }) {
  console.log('update');
  const data = { priority: true };
  await updateOrder(params.orderId, data);
  return null;
}
