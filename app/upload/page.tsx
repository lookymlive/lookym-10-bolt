import { UploadForm } from "@/components/upload/upload-form";

export default function UploadPage() {
  return (
    <div className="container mx-auto max-w-2xl px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">Upload Video</h1>
      <UploadForm />
    </div>
  );
}