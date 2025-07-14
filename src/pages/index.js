// src/pages/index.js

import { useEffect, useState } from "react";
import VideoCard from "../components/VideoCard";

export default function Home() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/videos")
      .then((res) => res.json())
      .then((data) => setVideos(data))
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  return (
    <main className="bg-black min-h-screen p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">TeaseHub</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {videos.map((video) => (
          <VideoCard key={video.uuid} video={video} />
        ))}
      </div>
    </main>
  );
}
