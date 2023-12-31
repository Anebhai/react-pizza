import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getTotalPrice } from './cartSLice';
import { getTotalQuantity } from './cartSLice';
import { formatCurrency } from '../../utils/helpers';

function CartOverview() {
  // ^ as sm:p-4 is not avialable we use sm:px-4 and style below classes with px and py for p to compensate that
  const totalQuantity = useSelector(getTotalQuantity);
  const totalPrice = useSelector(getTotalPrice);
  if (!totalQuantity) return null;
  return (
    <div className="flex items-center justify-between bg-stone-800 px-4 py-4 text-sm uppercase text-stone-200 sm:px-6 sm:text-base">
      <p className="space-x-4 font-semibold text-stone-300 sm:space-x-6">
        <span>{totalQuantity} pizzas</span>
        <span>{formatCurrency(totalPrice)}</span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
