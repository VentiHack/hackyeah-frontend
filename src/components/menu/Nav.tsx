import { NavLink } from "react-router-dom";
import { IconDog, IconMap2, IconPlus } from "@tabler/icons-react";

const Nav = () => {
  return (
    <nav className="h-[10svh] flex justify-center">
      <ul className="w-[70%] flex items-center justify-between ">
        <NavLink to="mapa">
          {({ isActive }) => (
            <IconMap2 size={32} color={isActive ? "#0CCA2B" : "#020817"} />
          )}
        </NavLink>
        <NavLink
          to="reportowanie"
          className="w-[60px] h-[60px] flex items-center justify-center shadow-md rounded-full"
        >
          <IconPlus size={32} />
        </NavLink>

        <NavLink to="zwierzeta">
          {({ isActive }) => (
            <IconDog size={32} color={isActive ? "#0CCA2B" : "#020817"} />
          )}
        </NavLink>
      </ul>
    </nav>
  );
};

export default Nav;
