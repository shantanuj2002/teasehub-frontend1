// src/pages/watch/[uuid].jsx
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function WatchPage() {
  const router = useRouter();
  const { uuid } = router.query;

  const [video, setVideo] = useState(null);

  useEffect(() => {
    if (uuid) {
      fetch(`http://localhost:8080/videos`)
        .then((res) => res.json())
        .then((data) => {
          const selected = data.find((vid) => vid.uuid === uuid);
          setVideo(selected);
        });
    }
  }, [uuid]);

  if (!video) return <p className="text-white p-4">Loading...</p>;

  return (
    <div className="bg-black min-h-screen text-white p-4">
      <h1 className="text-2xl font-bold mb-4">{video.title}</h1>
      <div className="aspect-video mb-4">
        <iframe
          src={video.embed_url}
          className="w-full h-full rounded-md"
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
        ></iframe>
      </div>
      <p className="text-gray-400">{video.description}</p>
    </div>
  );
}
