import { useParams } from "react-router-dom";

const Profile = () => {
    const { userId } = useParams();

    return <div>Profile {userId}</div>;
};

export default Profile;
