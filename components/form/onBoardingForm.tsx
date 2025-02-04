"use client";

import { useUser } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { sendGAEvent } from "@next/third-parties/google";
import axios from "axios";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

const onBoardingFormSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name is required" })
    .max(100, { message: "Name is too long" }),
  username: z
    .string()
    .min(1, { message: "Username is required" })
    .max(16, { message: "Username is too long" }),
  bio: z
    .string()
    .min(1, { message: "Bio is required" })
    .max(255, { message: "Bio is too long" }),
});

export default function OnBoardingForm() {
  const { user } = useUser();
  const router = useRouter();

  // Inital Form
  const form = useForm<z.infer<typeof onBoardingFormSchema>>({
    resolver: zodResolver(onBoardingFormSchema),
    defaultValues: {
      name: user?.fullName || "",
      username: "",
      bio: "",
    },
  });

  useEffect(() => {
    if (user) {
      form.setValue("name", user?.fullName || "");
    }
  }, [user, form]);

  // Submit Function
  const onSubmit = async (values: z.infer<typeof onBoardingFormSchema>) => {
    try {
      await axios.post("/api/users", {
        userId: user?.id,
        name: values.name,
        username: values.username,
        bio: values.bio,
        imageUrl: user?.imageUrl,
        email: user?.emailAddresses[0].emailAddress,
      });

      toast.success("Profile created!");
      form.reset();
      router.refresh();

      sendGAEvent({
        event: "Profile Created",
        value: {
          name: values.name,
          username: values.username,
          bio: values.bio,
          user: user,
        },
      });
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        {/* Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Username */}
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <div className="flex rounded-md border border-input ring-inset focus-within:ring-1 focus-within:ring-inset focus-within:ring-ring">
                  <span className="flex select-none items-center pl-3 text-muted-foreground sm:text-sm">
                    @
                  </span>
                  <Input
                    placeholder="username"
                    className="border-0 focus-visible:ring-0"
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* About */}
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>About</FormLabel>
              <FormControl>
                <Textarea className="h-32" placeholder="about" {...field} />
              </FormControl>
              <FormDescription>
                Write a few sentences about yourself.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Button */}
        <div>
          <Button disabled={form.formState.isSubmitting} type="submit">
            {form.formState.isSubmitting && (
              <Loader className="mr-2 h-4 w-4 animate-spin" />
            )}
            Create
          </Button>
        </div>
      </form>
    </Form>
  );
}
