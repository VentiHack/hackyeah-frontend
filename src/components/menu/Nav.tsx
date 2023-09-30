import { NavLink } from "react-router-dom";
import { IconDog, IconMap2, IconPlus } from "@tabler/icons-react";

const Nav = () => {
  return (
    <nav className="flex justify-center">
      <ul className="w-[70%] flex items-center justify-between ">
        <NavLink to="map">
          <IconMap2 size={32} />
        </NavLink>
        <div className="w-[60px] h-[60px] flex items-center justify-center shadow-md rounded-full">
          <IconPlus size={32} />
        </div>
        <NavLink to="animals">
          <IconDog size={32} />
        </NavLink>
      </ul>
    </nav>
  );
};

export default Nav;
