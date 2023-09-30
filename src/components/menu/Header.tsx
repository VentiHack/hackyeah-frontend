import { IconArrowNarrowLeft } from "@tabler/icons-react";
import { useLocation } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";

const Header = () => {
    const location = useLocation();
    const urlAdressSegment = location.pathname.split("/");
    const urlAdressWithoutSlash = urlAdressSegment
        .filter((segment) => segment !== "")
        .pop();
    const pageName = urlAdressWithoutSlash ? urlAdressWithoutSlash : "";

    return (
        <header className="flex items-center justify-between w-full p-4">
            <Link to="/">
                <IconArrowNarrowLeft />
            </Link>
            <h1 className="font-semibold text-lg">
                {pageName[0].toUpperCase() + pageName.slice(1)}
            </h1>
            <Link to="profile">
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </Link>
        </header>
    );
};

export default Header;
