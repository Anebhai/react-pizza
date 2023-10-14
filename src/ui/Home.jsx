import CreateUser from '../features/user/CreateUser';
function Home() {
  // *Tailwind are mobile first classes the class without sm,md lg is  size lesser than sm i.e below 640px.
  // ^sm	640px	@media (min-width: 640px) { ... }
  // ^ md	768px	@media (min-width: 768px) { ... }
  // ^ lg	1024px	@media (min-width: 1024px) { ... }
  // ^ xl	1280px	@media (min-width: 1280px) { ... }
  // ^ 2xl	1536px	@media (min-width: 1536px) { ... }
  return (
    <div className="my-10 px-6 text-center  sm:my-16">
      <h1 className="mb-8 text-center text-xl font-semibold md:text-3xl">
        The best pizza.
        <br />
        <span className="text-yellow-500 ">
          Straight out of the oven, straight to you.
        </span>
      </h1>
      <CreateUser />
    </div>
  );
}

export default Home;
