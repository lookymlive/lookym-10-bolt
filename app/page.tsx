import { VideoFeed } from "@/components/video-feed";
import { MainNav } from "@/components/main-nav";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <MainNav />
      <div className="container mx-auto px-4 py-6">
        <VideoFeed />
      </div>
    </main>
  );
}