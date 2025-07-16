import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function WatchPage() {
  const router = useRouter();
  const { uuid } = router.query;

  const [video, setVideo] = useState(null);

  useEffect(() => {
    if (uuid) {
      fetch("http://localhost:8080/videos")
        .then((res) => res.json())
        .then((data) => {
          const selected = data.find((vid) => vid.uuid === uuid);
          setVideo(selected);
        });
    }
  }, [uuid]);

  if (!video) return <p className="text-white p-4">Loading...</p>;

  return (
    <div className="bg-black text-white h-screen w-full flex flex-col items-center overflow-hidden">
      <div className="w-full max-w-md h-full flex flex-col">
        {/* Header - smaller and moved upward visually */}
        <div className="flex justify-between items-center px-4 py-2 bg-black h-[8vh]">
          <div className="text-lg font-bold">TeaseHub</div>
          <button className="p-1.5 bg-zinc-800 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"
              />
            </svg>
          </button>
        </div>

        {/* Video Player - increased height */}
        <div className="relative w-full h-[65vh]">
          <iframe
            src={video.embed_url}
            loading="lazy"
            className="absolute top-0 left-0 w-full h-full rounded-xl"
            style={{ border: 0 }}
            allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        {/* Scrollable Description Area - reduced height */}
        <div className="overflow-y-auto p-4 h-[27vh] bg-black">
          <h1 className="text-lg font-semibold mb-2">{video.title}</h1>
          <p className="text-sm text-gray-300 whitespace-pre-line">
            {video.description}
          </p>
        </div>
      </div>
    </div>
  );
}
