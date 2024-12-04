"use client";

import Image from "next/image";
import { Heart, MessageCircle, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

interface VideoCardProps {
  video: {
    id: string;
    storeId: string;
    storeName: string;
    videoUrl: string;
    thumbnail: string;
    title: string;
    price: number;
    likes: number;
    views: number;
  };
}

export function VideoCard({ video }: VideoCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-0">
        <div className="relative aspect-[9/16] w-full">
          <Image
            src={video.thumbnail}
            alt={video.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">{video.title}</h3>
          <span className="text-lg font-bold">${video.price}</span>
        </div>
        <p className="text-sm text-muted-foreground">{video.storeName}</p>
      </CardContent>
      <CardFooter className="flex justify-between p-4 pt-0">
        <Button variant="ghost" size="icon">
          <Heart className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <MessageCircle className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <Share2 className="h-5 w-5" />
        </Button>
      </CardFooter>
    </Card>
  );
}