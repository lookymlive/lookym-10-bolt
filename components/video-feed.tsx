"use client";

import { useState } from "react";
import { VideoCard } from "@/components/video-card";

const MOCK_VIDEOS = [
  {
    id: "1",
    storeId: "store1",
    storeName: "Fashion Boutique",
    videoUrl: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1080",
    thumbnail: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1080",
    title: "Summer Collection 2024",
    price: 89.99,
    likes: 1200,
    views: 5000,
  },
  {
    id: "2",
    storeId: "store2",
    storeName: "Urban Wear",
    videoUrl: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=1080",
    thumbnail: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=1080",
    title: "Street Style Essentials",
    price: 59.99,
    likes: 800,
    views: 3500,
  },
];

export function VideoFeed() {
  const [videos] = useState(MOCK_VIDEOS);

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
  );
}