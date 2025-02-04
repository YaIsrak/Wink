"use client";

import { useModal } from "@/hooks/use-modal-store";
// import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabase";
import { useUser } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { sendGAEvent } from "@next/third-parties/google";
import axios from "axios";
import { Loader } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
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
import { Input } from "../ui/input";
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
  const [files, setFiles] = useState<File[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      content: "",
      imageUrls: [],
    },
    resolver: zodResolver(formSchema),
  });

  let isLoading = form.formState.isSubmitting;

  const handleClose = () => {
    form.reset();
    onClose();
  };

  // info: Upload Image
  const onUpload = async () => {
    if (files.length === 0) return [];

    const uploadedUrls: string[] = [];

    // upload every  single file
    for (const file of files) {
      // Check file size (20MB = 20 * 1024 * 1024 bytes)
      if (file.size > 20 * 1024 * 1024) {
        toast.error("File is too large", {
          description: `"${file.name}" is too large. Max size: 20MB.`,
        });

        throw new Error("File is too large");
      } else {
        const fileName = `${user?.firstName}-${file.name}-${Date.now()}`;
        const { data, error } = await supabase.storage
          .from("images")
          .upload(fileName, file);

        if (error) {
          toast.error("Failed to upload image", {
            description: error.message,
          });
          continue;
        }

        const publicUrl = `${supabase.storage.from("images").getPublicUrl(data.path).data.publicUrl}`;
        uploadedUrls.push(publicUrl);
      }
    }

    return uploadedUrls;
  };

  // info: Create Post
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const imageUrls = await onUpload();
      await axios.post("/api/posts", {
        content: values.content,
        imageUrls: imageUrls,
      });
      toast.success("Posted");
      router.refresh();
      onClose();
      form.reset();
      sendGAEvent({
        event: "Post Created",
        value: {
          content: values.content,
          imageUrls: imageUrls,
          user: user,
        },
      });
    } catch (error: any) {
      toast.error("Something went wrong", {
        description: error.message,
      });
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
                          blurDataURL="/placeholder.jpg"
                          placeholder="blur"
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
                          {/* upload */}
                          <Input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={(e) => {
                              const selectedFiles = Array.from(
                                e.target.files || [],
                              );
                              setFiles(selectedFiles);
                              field.onChange(
                                selectedFiles.map((file) =>
                                  URL.createObjectURL(file),
                                ),
                              );
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
