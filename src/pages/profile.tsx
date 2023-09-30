import { useParams } from "react-router-dom";

const Profile = () => {
  const { userId } = useParams();

  return <div className="h-[80svh]">Profile {userId}</div>;
};

export default Profile;
