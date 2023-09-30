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

const formSchema = z.object({
    knownAnimalSpecies: z.boolean().default(false),
    animalSpecies: z.string(),
    additionalInfo: z.string().optional(),
});

const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
};

const SubmitForm = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            knownAnimalSpecies: false,
            animalSpecies: "",
            additionalInfo: "",
        },
    });

    return (
        <>
            <div className="p-4">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            control={form.control}
                            name="knownAnimalSpecies"
                            render={({ field }) => (
                                <FormItem className="flex items-center justify-between p-4 border-t border-x rounded-t-md">
                                    <FormLabel className="text-base">
                                        Do you know the animal species?
                                    </FormLabel>
                                    <FormControl>
                                        <Switch
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
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
                                    <FormLabel>Animal Species</FormLabel>
                                    <FormControl>
                                        <Input placeholder="ryś" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        This is the animal species
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                            // disabled={knownAnimalSpecies}
                        />
                        <FormField
                            control={form.control}
                            name="additionalInfo"
                            render={({ field }) => (
                                <FormItem className="mb-8">
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
                        <Button type="submit">Submit</Button>
                    </form>
                </Form>
            </div>
        </>
    );
};

export default SubmitForm;
