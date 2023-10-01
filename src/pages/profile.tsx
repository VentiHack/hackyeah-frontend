import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Profile = () => {
  return (
    <div className="h-[80vh] flex flex-col overflow-scroll p-4">
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
      </div>
    </div>
  );
};

export default Profile;
