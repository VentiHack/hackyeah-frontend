import { useState } from "react";

const Animals = () => {
  const [activeType, setActiveType] = useState(true);

  const dummyAnimalsData = [
    {
      animalSpecies: "Lew",
      knownAnimalSpecies: true,
      latitude: -1.2921,
      longitude: 36.8219,
      timeDate: "2023-09-30",
      additionalInfo:
        "Ten lew jest często spotykany w Parku Narodowym Serengeti.",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/a/ae/African_Lion_Panthera_leo_Male_Pittsburgh_2800px.jpg",
    },
    {
      animalSpecies: "Słoń",
      knownAnimalSpecies: true,
      latitude: -3.0674,
      longitude: 37.3556,
      timeDate: "2023-09-30",
      additionalInfo: "Słonie są znane ze swojej inteligencji i wielkich uszu.",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/3/37/African_Bush_Elephant.jpg",
    },
    {
      animalSpecies: "Żyrafa",
      knownAnimalSpecies: true,
      latitude: 0.4972,
      longitude: 37.2762,
      timeDate: "2023-09-30",
      additionalInfo: "Żyrafy mają bardzo długie szyje i są roślinożercami.",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/4/46/Giraffe_in_Selous_Game_Reserve_%289%29_%2829049301195%29%2C_crop.jpg",
    },
  ];
  return (
    <>
      <div className="h-[80svh] px-4 flex flex-col">
        <div className="flex items-center justify-around">
          <h2
            onClick={() => setActiveType(true)}
            className={`px-2 font-semibold ${
              activeType ? " border-greenAccent" : " border-white"
            } text-lg border-b-2 `}
          >
            Obserwowane
          </h2>
          <h2
            onClick={() => setActiveType(false)}
            className={`px-2 font-semibold${
              !activeType ? " border-greenAccent" : " border-white"
            } text-lg border-b-2`}
          >
            Niebezpieczne
          </h2>
        </div>
        <div className="flex-grow mt-4 overflow-auto">
          <ul className="flex flex-col items-center gap-4">
            {dummyAnimalsData.map((animal) => (
              <li className="w-[100%] h-[40svh] shadow-md rounded-md ">
                <img
                  className="w-full h-full object-cover rounded-md"
                  src={animal.image}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Animals;
