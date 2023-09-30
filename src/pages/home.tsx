// import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";

const Home = () => {
    return (
        <div className="min-h-screen flex items-center flex-col justify-around">
            <span className="text-center">
                <h1 className="text-4xl leading-6 mb-2 font-bold">
                    AnimalFinder
                </h1>
                <p className="text-slate-500">
                    Report animals and mark their location on map
                </p>
            </span>
            <div className="w-72 aspect-square border rounded-xl border-red-500"></div>
            <span className="flex flex-col w-full items-center">
                {/* <Link to={"/"} className="w-full flex justify-center"> */}
                <Button className="text-xl px-8">Report now</Button>
                {/* </Link> */}
                {/* <Link to={"/"}> */}
                <button>View all reported &rarr;</button>
                {/* </Link> */}
            </span>
        </div>
    );
};

export default Home;
