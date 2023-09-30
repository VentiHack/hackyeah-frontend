import { IconArrowNarrowLeft } from "@tabler/icons-react";
import { useLocation } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";

const Header = () => {
  let location = useLocation();
  console.log(location);

  let urlAdressSegment = location.pathname.split("/");
  let urlAdressWithoutSlash = urlAdressSegment
    .filter((segment) => segment !== "")
    .pop();
  let pageName = urlAdressWithoutSlash ? urlAdressWithoutSlash : "";

  return (
    <header className="h-[10svh] flex items-center justify-between w-full p-4">
      <Link to="..">
        <IconArrowNarrowLeft />
      </Link>
      <h1 className="font-semibold text-lg">{pageName}</h1>
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </header>
  );
};

export default Header;
