import Header from "./Header";
import CartOverView from "../features/cart/CartOverview";
import { Outlet, useNavigation } from "react-router-dom";
import Loader from "./Loader";

function AppLayout() {
  // ^This is particulary used for loading purposes while fetch focus its usenavigate not useNavigation.
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  return (
    <div className="layout">
      {isLoading && <Loader />}
      <Header />
      <main>
        {/* ^Outlet here below renders the child elements of the Applayout which is the parent route, In react community it is known as layout route */}
        <Outlet />
      </main>
      <CartOverView />
    </div>
  );
}

export default AppLayout;
