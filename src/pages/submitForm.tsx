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
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            knownAnimalSpecies: false,
            animalSpecies: "",
            additionalInfo: "",
            photo: undefined,
        },
    });

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords;
                console.log({
                    ...values,
                    knownAnimalSpecies: isChecked,
                    latitude,
                    longitude,
                    timeDate: new Date().toISOString(),
                });
            });
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
    };

    const [isChecked, setIsChecked] = useState(false);

    return (
        <>
            <div className="p-4 h-[80vh] overflow-scroll">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
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
                                            onCheckedChange={() =>
                                                setIsChecked(!isChecked)
                                            }
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="animalSpecies"
                            render={({ field }) => (
                                <FormItem className="p-4 border-x border-b mb-8 rounded-b-md">
                                    <FormLabel
                                        className={
                                            isChecked ? "" : "text-slate-500"
                                        }
                                    >
                                        Animal Species
                                    </FormLabel>
                                    <FormControl>
                                        <Input placeholder="ryś" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        This is the animal species
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                            disabled={!isChecked}
                        />
                        <FormField
                            control={form.control}
                            name="additionalInfo"
                            render={({ field }) => (
                                <FormItem className="mb-8 p-2">
                                    <FormLabel>Additional info</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Additional info about the animal"
                                            className="resize-none"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        You can tell us more about the animal
                                        you found.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="photo"
                            render={() => (
                                <FormItem className="p-2 mb-8 rounded-md flex flex-col">
                                    <FormLabel>Upload a photo</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="file"
                                            {...form.register("photo")}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Upload a photo to help others recognise
                                        the animal
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <span className="flex justify-center">
                            <Button
                                className="bg-greenAccent text-white text-xl p-4 rounded-xl px-8"
                                type="submit"
                            >
                                Submit
                            </Button>
                        </span>
                    </form>
                </Form>
            </div>
        </>
    );
};

export default SubmitForm;
