// src/components/VideoCard.jsx
import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";

export default function VideoCard({ video }) {
  const router = useRouter();

  // On thumbnail click, navigate to watch page using UUID
  const handleClick = () => {
    router.push(`/watch/${video.uuid}`);
  };

  return (
    <div
      className="bg-zinc-900 rounded-xl overflow-hidden shadow-lg cursor-pointer"
      onClick={handleClick}
    >
      {/* Thumbnail Image with 9:16 aspect ratio */}
      <div
        className="relative w-full"
        style={{ aspectRatio: "9 / 16", maxHeight: "80vh" }}
      >
        <Image
          src={video.thumbnail_url}
          alt={video.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 300px"
        />

        {/* Play Button Overlay (visible on hover) */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition">
          <svg
            className="w-10 h-10 text-white"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M4 4l12 6-12 6V4z" />
          </svg>
        </div>
      </div>

      {/* Title + Description Section */}
      <div className="p-2 text-white text-sm">
        <h3 className="font-semibold line-clamp-2">{video.title}</h3>
        <p className="text-gray-400 text-xs mt-1">{video.description}</p>
      </div>
    </div>
  );
}
