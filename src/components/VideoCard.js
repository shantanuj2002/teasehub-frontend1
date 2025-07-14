import { useRouter } from "next/router";

export default function VideoCard({ video }) {
  const router = useRouter();

  return (
    <div
      className="bg-zinc-900 rounded-lg overflow-hidden shadow-md cursor-pointer"
      onClick={() => router.push(`/watch/${video.uuid}`)}
    >
      <div className="relative w-full aspect-[16/9]">
        <img
          src={video.thumbnail_url}
          alt={video.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition">
          <svg
            className="w-12 h-12 text-white"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M4 4l12 6-12 6V4z" />
          </svg>
        </div>
      </div>
      <div className="p-2 text-sm text-white">
        <h3 className="font-semibold line-clamp-2">{video.title}</h3>
        <p className="text-gray-400 text-xs mt-1">{video.description}</p>
      </div>
    </div>
  );
}
