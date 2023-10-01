import { useEffect, useState, Suspense } from "react";
import {
  IconMapPinCheck,
  IconPhone,
  IconInfoCircle,
} from "@tabler/icons-react";
import moment from "moment";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const Animals = () => {
  const [activeType, setActiveType] = useState(true);
  const [animalsData, setAnimalsData] = useState<Animal[]>([]);

  interface Animal {
    additionalInfo: string;
    animalSpecies: string;
    createdAt: string;
    id: number;
    img: string;
    knownAnimalSpecies: boolean;
    latitude: number;
    longitude: number;
    updatedAt: string;
  }

  const fetchDataHandler = async () => {
    const response = await fetch("http://10.250.162.30:3000/api");

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Could not fetch prices");
    }
    setAnimalsData(data);
    console.log(data);
  };

  useEffect(() => {
    fetchDataHandler();
  }, []);

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
          <Suspense fallback={<Skeleton />}>
            <ul className="flex flex-col items-center gap-4">
              {animalsData.map((animal) => (
                <li
                  key={animal.id}
                  className="w-[100%] h-[45svh] flex flex-col shadow-md rounded-md"
                >
                  <div className="min-h-[20%] flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Avatar className="w-[40px] h-[40px]">
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <h2 className="font-medium">Jan Nowak</h2>
                    </div>
                    <div className="flex items-center text-center p-4">
                      <IconPhone size={32} color="#0CCA2B" />
                    </div>
                  </div>
                  <div></div>
                  <div className="min-h-[60%] ">
                    <img
                      className="w-full h-full object-cover rounded-md"
                      src={`http://10.250.162.30:3000${animal.img}`}
                    />
                  </div>
                  <div className="min-h-[20%] flex justify-between items-center">
                    <div className="flex flex-col p-4">
                      <h3 className="font-semibold">
                        Ostatnio widziany -{" "}
                        {animal.animalSpecies === "unknown"
                          ? ""
                          : animal.animalSpecies}
                      </h3>
                      <p>{moment(animal.createdAt).format("DD.MM.YYYY")}</p>
                    </div>
                    <div className="flex items-center text-center gap-2 p-4">
                      <IconMapPinCheck size={32} color="#0CCA2B" />
                      <Dialog>
                        <DialogTrigger asChild>
                          <IconInfoCircle size={32} color="#0CCA2B" />
                        </DialogTrigger>
                        <DialogContent className="w-[80%]">
                          <DialogHeader>
                            <DialogTitle className="text-lg font-semibold">
                              Informacje
                            </DialogTitle>
                            <DialogDescription>
                              <ul>
                                <li className="text-md font-medium">
                                  Gatunek: {animal.animalSpecies}
                                </li>
                                <li className="text-md font-medium">
                                  Data zreportowania:{" "}
                                  {moment(animal.createdAt).format(
                                    "DD.MM.YYYY"
                                  )}
                                </li>
                                <li className="text-md font-medium">
                                  Dodatkowe informacje: {animal.additionalInfo}
                                </li>
                              </ul>
                            </DialogDescription>
                          </DialogHeader>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default Animals;
