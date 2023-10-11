import Header from "./Header";
import CartOverView from "../features/cart/CartOverview";
import { Outlet } from "react-router-dom";

function AppLayout() {
  return (
    <div>
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
