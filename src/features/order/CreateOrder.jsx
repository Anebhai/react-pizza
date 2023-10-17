import { useState } from 'react';
import {
  Form,
  json,
  redirect,
  useActionData,
  useNavigation,
} from 'react-router-dom';
import Cart from '../cart/Cart';
import { createOrder } from '../../services/apiRestaurant';
import Button from '../../ui/Button';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, getCart, getTotalPrice } from '../cart/cartSLice';
import EmptyCart from '../cart/EmptyCart';
import store from '../../store';
import { formatCurrency } from '../../utils/helpers';
import { fetchAddress } from '../user/userSlice';

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  const formErrors = useActionData();
  const dispatch = useDispatch();

  const [withPriority, setWithPriority] = useState(false);
  const {
    userName,
    status: addressStatus,
    position,
    address,
    error: errorAddress,
  } = useSelector((state) => state.user);
  // ^notice in useActiondata its not error in name but data, but we usually use to catch error.

  const isLoadingAddress = addressStatus === 'loading';
  const cart = useSelector(getCart);
  const totalPrice = useSelector(getTotalPrice);
  const priorityPrice = withPriority ? totalPrice * 0.2 : 0;
  const tolalPrice = totalPrice + priorityPrice;
  if (!cart.length) return <EmptyCart />;

  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Let's go!</h2>

      {/* <Form method="post" action="/order/new"> */}

      {/* Above form also works react router is smart enough to link to the familiar route */}

      <Form method="post">
        {/* BY using form of react router its so much easy we dont need to use useeffect, preventdefault, state variables for each input field etc */}
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <div className="grow">
            <input
              type="text"
              name="customer"
              defaultValue={userName}
              required
              className="input w-full"
            />
          </div>
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input type="tel" name="phone" required className="input w-full" />

            {formErrors?.phone && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-800">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="relative mb-5 flex flex-col gap-2 sm:flex-row sm:items-center ">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              type="text"
              name="address"
              required
              className=" input w-full"
              disabled={isLoadingAddress}
              defaultValue={address}
            />
          </div>
          {addressStatus === 'error' && (
            <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-800">
              {errorAddress}
            </p>
          )}
          {!position.latitude && !position.longitude && (
            <span className="absolute right-[3px] top-[3px] z-50 md:right-[5px] md:top-[5px]">
              <Button
                type="small"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(fetchAddress());
                }}
                disabled={isLoadingAddress}
              >
                Get Position
              </Button>
            </span>
          )}
        </div>

        <div className="mb-12 flex items-center gap-5">
          <input
            className=" h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="font-medium">
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          {/* Below input is one of the way to see the fake cart so remember this method especially name stringify(cart) */}
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input
            type="hidden"
            name="position"
            value={
              position.latitude && position.longitude
                ? `${position.latitude},${position.longitude}`
                : ''
            }
          />
          <Button disabled={isSubmitting || isLoadingAddress} type="primary">
            {' '}
            {isSubmitting
              ? 'Placing Order...'
              : `Order Now From ${formatCurrency(tolalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  // *The above two lines of code recipes will remain same

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === 'true',
  };
  const errors = {};
  if (!isValidPhone(order.phone)) {
    errors.phone =
      'please give us the correct phone number,We might need to contact you.';
  }
  if (Object.keys(errors).length > 0) return errors;
  //^ this is to catch errors using useActiondata hook.

  const newOrder = await createOrder(order);
  // *here below as its not a component so the react router provides as redirect instead of usenavigat()
  // $Dont use the store and without usedipatch hook as it will create optimization issues so always, here it is not component so we are using.
  store.dispatch(clearCart());
  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
