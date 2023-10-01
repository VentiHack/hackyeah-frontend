import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IconMapPinCheck, IconInfoCircle } from "@tabler/icons-react";
import moment from "moment";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const Profile = () => {
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
    <div className="h-[80vh] px-4 flex flex-col">
      <div className="flex-grow mt-4 overflow-auto">
        <div className="flex flex-col mb-4">
          <div className="flex flex-col h-[200px] relative">
            <div className="h-[100%] overflow-hidden bg-center rounded-md bg-cover bg-[url('https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/advisor/wp-content/uploads/2023/07/top-20-small-dog-breeds.jpeg.jpg')]"></div>
            <Avatar className="w-[80px] h-[80px] absolute top-[125%] left-1/2 transform -translate-x-1/2 -translate-y-[125%]">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
          <div className="flex flex-col items-center mt-8 gap-2">
            <h1 className="font-semibold text-2xl">Adam Nowak</h1>
            <h2 className="font-semibold text-md">@adam03</h2>
            <h3 className="font-sizebold text-md">Zreportowane zwierzęta</h3>
          </div>
        </div>
        <ul className="flex flex-col items-center gap-4">
          {animalsData.map((animal) => (
            <li
              key={animal.id}
              className="w-[100%] h-[45svh] flex flex-col shadow-md rounded-md"
            >
              <div className="min-h-[80%] ">
                <img
                  className="w-full h-full object-cover rounded-md"
                  src={`http://10.250.162.30:3000${animal.img}`}
                />
              </div>
              <div className="min-h-[20%] flex justify-between">
                <div className="flex flex-col p-4">
                  <h3 className="font-semibold">Ostatnio widziany</h3>
                  <p>{moment(animal.createdAt).format("DD.MM.YYYY")}</p>
                </div>
                <div className="flex items-center text-center p-4">
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
                              {moment(animal.createdAt).format("DD.MM.YYYY")}
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
      </div>
    </div>
  );
};

export default Profile;
