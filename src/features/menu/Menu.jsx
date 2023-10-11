import { useLoaderData } from "react-router-dom";
import { getMenu } from "../../services/apiRestaurant";
import MenuItem from "./MenuItem";

function Menu() {
  const menu = useLoaderData();
  console.log(menu);
  return (
    <ul>
      {menu.map((pizza) => (
        <MenuItem pizza={pizza} key={pizza.id} />
      ))}
    </ul>
  );
}

// ^The problem with useeffect is that first the component is rendered but with loader strategy here the we render as we fetch i.e both happen simultaneously.
// * Also see how we have connected the loader by fetching it in apiRestaurant and using loader function here and than connecting it in app component file with giving name as menu loader and again use useloader hook in the file.
export async function loader() {
  const menu = await getMenu();
  return menu;
}

export default Menu;
