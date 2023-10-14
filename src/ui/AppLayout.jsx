import Header from './Header';
import CartOverView from '../features/cart/CartOverview';
import { Outlet, useNavigation } from 'react-router-dom';
import Loader from './Loader';

function AppLayout() {
  // ^This is particulary used for loading purposes while fetch focus its usenavigate not useNavigation.
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';
  // ^ [] as escape hatch for tailwind its powerful but never overuse it.
  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto]">
      {isLoading && <Loader />}

      <Header />
      <div className="overflow-scroll">
        <main className="mx-auto max-w-3xl">
          {/* ^Outlet here below renders the child elements of the Applayout which is the parent route, In react community it is known as layout route */}
          <Outlet />
        </main>
      </div>
      <CartOverView />
    </div>
  );
}

export default AppLayout;
