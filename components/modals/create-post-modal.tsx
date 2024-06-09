"use client";

import { useModal } from "@/hooks/use-modal-store";
import { UploadButton } from "@/lib/uploadthing";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Loader } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { Textarea } from "../ui/textarea";

const formSchema = z.object({
  content: z
    .string()
    .min(1, { message: "Content is required" })
    .max(1000, { message: "Content is too long" }),
  imageUrls: z.array(z.any()).optional(),
});

export default function CreatePostModal() {
  const router = useRouter();
  const { user } = useUser();
  const { isOpen, onClose, type } = useModal();
  const isModalOpen = isOpen && type === "createPost";

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      content: "",
      imageUrls: [],
    },
    resolver: zodResolver(formSchema),
  });

  const isLoading = form.formState.isSubmitting;

  const handleClose = () => {
    form.reset();
    onClose();
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post("/api/posts", values);
      toast.success("Posted");
      router.refresh();
      onClose();
      form.reset();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="flex flex-col items-center border-none bg-transparent shadow-none">
        <h1 className="text-white">New Post</h1>

        <div className="w-full rounded-xl bg-background p-6">
          <div className="flex gap-2">
            <Avatar>
              <AvatarImage src={user?.imageUrl} />
            </Avatar>

            <div className="w-full">
              <h3>{user?.fullName}</h3>

              {/* Image */}
              {form.getValues("imageUrls") && (
                <ScrollArea className="w-80">
                  <div className="flex w-max space-x-4 pb-2">
                    {form.getValues("imageUrls")?.map((url) => (
                      <div key={url} className="relative mb-2">
                        <Image
                          src={url}
                          alt={url}
                          width={400}
                          height={400}
                          className="max-h-64 w-full rounded-2xl object-cover"
                        />
                      </div>
                    ))}
                  </div>
                  <ScrollBar orientation="horizontal" />
                </ScrollArea>
              )}

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  {/* Content TextArea */}
                  <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea
                            disabled={isLoading}
                            placeholder="What's on your mind?"
                            className="border-none px-0 shadow-none focus-visible:ring-0"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="imageUrls"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <UploadButton
                            endpoint="postImage"
                            className={cn(
                              // buttonVariants({ variant: "ghost" }),
                              "ut-button:h-8 ut-button:rounded-md ut-button:bg-primary/10 ut-button:px-1 ut-button:text-xs ut-button:text-primary ut-button:ring-0 ut-button:ring-primary",
                              "block",
                              "ut-allowed-content:hidden",
                            )}
                            onClientUploadComplete={(res) => {
                              field.onChange(res.map((photo) => photo.url));
                            }}
                            onUploadError={(error: Error) => {
                              toast.error(error.message);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex">
                    <div className="mx-auto"></div>
                    <Button
                      disabled={isLoading}
                      type="submit"
                      className="shadow-none"
                      variant={"outline"}
                    >
                      {isLoading && (
                        <Loader className="mr-2 h-4 w-4 animate-spin" />
                      )}
                      {isLoading ? "Posting..." : "Post"}
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
