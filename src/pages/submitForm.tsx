import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
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
        formData.append("knownAnimalSpecies", isChecked.toString());
        formData.append("animalSpecies", values.animalSpecies ?? "");
        formData.append("additionalInfo", values.additionalInfo ?? "");

        if (values.photo && values.photo[0])
          formData.append("file", values.photo[0], values.photo[0].name);

        formData.append("latitude", latitude.toString());
        formData.append("longitude", longitude.toString());

        try {
          await fetch("http://10.250.162.170:3000/api/submit", {
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
    navigate("/map");
    setIsUploading(false);
  };

  const [isChecked, setIsChecked] = useState(false);

  return (
    <>
      <div className="h-[80svh] flex justify-center items-center p-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {/* <FormField
              control={form.control}
              name="knownAnimalSpecies"
              render={() => (
                <FormItem className="flex items-center justify-between p-4 border-t border-x rounded-t-md">
                  <FormLabel className="text-base">
                    Do you know the animal species?
                  </FormLabel>
                  <FormControl>
                    <Switch
                      color="#ffffff"
                      checked={isChecked}
                      onCheckedChange={() => setIsChecked(!isChecked)}
                    />
                  </FormControl>
                </FormItem>
              )}
            /> */}
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
              // disabled={!isChecked}
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

            <FormField
              control={form.control}
              name="photo"
              render={() => (
                <FormItem className="p-4 border-x border-b mb-4 rounded-b-md">
                  <FormLabel>Wrzuć zdjęcie zwierzęcia</FormLabel>
                  <FormControl>
                    <Input type="file" {...form.register("photo")} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              className="bg-greenAccent w-[100%]  text-white text-xl p-6 rounded-md px-8 disabled:cursor-not-allowed"
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
