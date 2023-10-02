import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  // FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const formSchema = z.object({
  knownAnimalSpecies: z.boolean().default(false),
  animalSpecies: z.string().optional(),
  additionalInfo: z.string().optional(),
  photo: z.custom((data: unknown) => {
    const file = data as File | undefined;
    if (!file) return true;
    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      return "Please upload a valid image";
    }
    return true;
  }),
});

const SubmitForm = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [isKnown, setIsKnown] = useState(0);
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      knownAnimalSpecies: false,
      animalSpecies: "",
      additionalInfo: "",
      photo: undefined,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsUploading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        const formData = new FormData();
        formData.append("knownAnimalSpecies", isKnown !== 1 ? "false" : "true");
        formData.append("animalSpecies", values.animalSpecies ?? "");
        formData.append("additionalInfo", values.additionalInfo ?? "");

        if (values.photo && values.photo[0])
          formData.append("file", values.photo[0], values.photo[0].name);

        formData.append("latitude", latitude.toString());
        formData.append("longitude", longitude.toString());

        try {
          await fetch("http://10.250.162.30:3000/api/submit", {
            method: "POST",
            body: formData,
          });
        } catch (error) {
          console.log("Error: ", error);
        }
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
    navigate("/mapa");
    setIsUploading(false);
  };

  return (
    <>
      <div className="h-[80svh] flex justify-center items-center p-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="knownAnimalSpecies"
              render={() => (
                <FormItem className="p-4 border-x border-b rounded-b-md mb-4 ">
                  <FormLabel className="text-md text-medium">
                    Czy wiesz jaki to gatunek?
                  </FormLabel>
                  <div className="flex items-center justify-between ">
                    <div
                      onClick={() => setIsKnown(1)}
                      className={`w-[45%] flex items-center justify-center border-2 border-greenAccent ${
                        isKnown === 1
                          ? "bg-greenAccent text-white"
                          : "bg-white text-greenAccent"
                      } rounded-md p-2`}
                    >
                      Wiem
                    </div>

                    <div
                      onClick={() => setIsKnown(2)}
                      className={`w-[45%] flex items-center justify-center border-2 border-greenAccent ${
                        isKnown === 2
                          ? "bg-greenAccent text-white"
                          : "bg-white text-greenAccent"
                      } rounded-md p-2`}
                    >
                      Nie wiem
                    </div>
                  </div>
                </FormItem>
              )}
            />
            {isKnown !== 2 && (
              <FormField
                control={form.control}
                name="animalSpecies"
                render={({ field }) => (
                  <FormItem className="p-4 border-x border-b mb-4 rounded-b-md">
                    <FormLabel className="text-md text-medium">
                      Wpisz jakie zwierze widzisz
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="border focus:outline-none "
                        placeholder="Sarna, jeleń, ryś"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="photo"
              render={() => (
                <FormItem className="p-4 border-x border-b mb-4 rounded-b-md">
                  <FormLabel>Wrzuć zdjęcie zwierzęcia</FormLabel>
                  <FormControl>
                    <Input type="file" {...form.register("photo")} />
                  </FormControl>
                  {isKnown === 2 && (
                    <FormDescription>
                      Jeśli załączysz zdjęcie, rozpoznamy jakiego jest gatunku
                    </FormDescription>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="additionalInfo"
              render={({ field }) => (
                <FormItem className="p-4 border-x border-b mb-4 rounded-b-md">
                  <FormLabel>Podaj dodatkowe informacje</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Powiedz nam coś o zwierzęciu które znalazłeś, jeśli niepokoi cię zachowania zwierzęcia napisz dlaczego"
                      className="h-[150px] resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              className="bg-greenAccent w-[100%]  text-white text-lg p-6 rounded-md px-8 disabled:cursor-not-allowed"
              disabled={isUploading}
              type="submit"
            >
              Opublikuj
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
};

export default SubmitForm;
