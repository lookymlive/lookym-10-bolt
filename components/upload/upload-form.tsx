"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Upload } from "lucide-react";
import { useUploadStore } from "@/lib/store/upload-store";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

const formSchema = z.object({
  title: z.string().min(3).max(100),
  description: z.string().min(10).max(500),
  price: z.number().min(0),
  storeName: z.string().min(2),
  video: z.instanceof(File),
  thumbnail: z.instanceof(File),
});

export function UploadForm() {
  const [preview, setPreview] = useState<string | null>(null);
  const { uploadVideo, isUploading, progress } = useUploadStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      storeName: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await uploadVideo(values.video, values.thumbnail, {
        title: values.title,
        description: values.description,
        price: values.price,
        storeName: values.storeName,
        storeId: "current-store-id", // This should come from the store context
        products: [], // Add product management later
      });
      toast.success("Video uploaded successfully!");
      form.reset();
      setPreview(null);
    } catch (error) {
      toast.error("Failed to upload video. Please try again.");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="video"
            render={({ field: { onChange, ...field } }) => (
              <FormItem>
                <FormLabel>Video</FormLabel>
                <FormControl>
                  <Input
                    className="file:bg-transparent"
                    type="file"
                    accept="video/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) onChange(file);
                    }}
                    value={field.value?.name || ''}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="thumbnail"
            render={({ field: { onChange, ...field } }) => (
              <FormItem>
                <FormLabel>Thumbnail</FormLabel>
                <FormControl>
                  <Input
                    className="file:bg-transparent"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        onChange(file);
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setPreview(reader.result as string);
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    value={field.value?.name || ''}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter video title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter video description"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  {...field}
                  onChange={(e) => field.onChange(parseFloat(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {isUploading && <Progress value={progress} className="w-full" />}

        <Button type="submit" disabled={isUploading} className="w-full">
          {isUploading ? (
            "Uploading..."
          ) : (
            <>
              <Upload className="mr-2 h-4 w-4" />
              Upload Video
            </>
          )}
        </Button>
      </form>
    </Form>
  );
}