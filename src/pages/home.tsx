import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen flex items-center flex-col justify-around p-4">
      <div className="flex flex-col w-full items-center gap-4">
        <h1 className="text-4xl leading-6 mb-2 font-bold">Gwizd</h1>
        <p className="text-slate-500 text-center">
          Zgłaszaj Znalezione Zwierzęta w Twojej Okolicy
        </p>
      </div>
      <img src="/images/landingImage.png" className="w-72"></img>
      <div className="flex flex-col w-full items-center gap-4">
        <Link
          to="mapa"
          className="bg-greenAccent text-white text-xl p-4 rounded-xl"
        >
          Daj znać o zwierzakach!
        </Link>
        <Link to="zwierzeta" className="text-slate-500">
          Zobacz wszystkie zgłoszenia
        </Link>
      </div>
    </div>
  );
};

export default Home;
