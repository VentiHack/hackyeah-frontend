import { Outlet } from "react-router-dom";
import Header from "@/components/menu/Header";
import Nav from "@/components/menu/Nav";
import { useLocation } from "react-router-dom";

const Root = () => {
    const location = useLocation();
    return (
        <>
            {location.pathname !== "/" && <Header />}
            <Outlet />
            {location.pathname !== "/" && <Nav />}
        </>
    );
};

export default Root;
