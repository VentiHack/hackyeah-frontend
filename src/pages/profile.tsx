import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Profile = () => {
    return (
        <div className="h-[80vh] flex flex-col overflow-scroll p-4">
            <div className="space-y-0.5">
                <Label htmlFor="username">Username</Label>
                <Input
                    type="text"
                    id="username"
                    placeholder="Username"
                    disabled
                />
            </div>
            <div className="space-y-0.5">
                <Label htmlFor="Email">Email</Label>
                <Input
                    type="email"
                    id="email"
                    placeholder="email@email.com"
                    disabled
                />
            </div>
        </div>
    );
};

export default Profile;
