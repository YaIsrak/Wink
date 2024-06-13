"use client";

import { useModal } from "@/hooks/use-modal-store";
import { useUser } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";
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

const formSchema = z.object({
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

export default function EditProfileModal() {
  const router = useRouter();
  const { user } = useUser();
  const { isOpen, onClose, type, data } = useModal();
  const isModalOpen = isOpen && type === "editProfile";

  const { profile } = data;

  const form = useForm({
    defaultValues: {
      name: "",
      username: "",
      bio: "",
    },
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    if (profile) {
      form.setValue("name", profile.name);
      form.setValue("username", profile.username);
      form.setValue("bio", profile.bio || "");
    }
  }, [profile, form]);

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/users/${profile?.id}`, {
        userId: profile?.userId,
        name: values.name,
        username: values.username,
        bio: values.bio,
      });
      toast.success("Saved");
      router.refresh();
      onClose();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="flex flex-col items-center border-none bg-transparent shadow-none">
        <h1 className="text-white">Edit Profile</h1>

        <div className="w-full rounded-xl bg-background p-6">
          <div className="flex gap-2">
            <Avatar>
              <AvatarImage src={user?.imageUrl} />
            </Avatar>

            <div className="w-full">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  {/* name */}
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
                          <Textarea
                            className="h-32"
                            placeholder="about"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Write a few sentences about yourself.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    disabled={isLoading}
                    type="submit"
                    className="shadow-none"
                    variant={"outline"}
                  >
                    {isLoading && (
                      <Loader className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    {isLoading ? "Saving..." : "Save"}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
