import { useSelector } from 'react-redux';

function UserName() {
  const userName = useSelector((state) => state.user.userName);
  // ^Hidden for mobile screens from 768px its not hidden
  if (!userName) return null;
  return (
    <div className="hidden text-sm font-semibold md:block ">{userName}</div>
  );
}

export default UserName;
