import { useEffect, useState } from "react";
import VideoCard from "../components/VideoCard";

export default function Home() {
  const [videos, setVideos] = useState([]);
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  const fetchVideos = async (q = "") => {
    const url = q
      ? `http://localhost:8080/search?q=${encodeURIComponent(q)}`
      : `http://localhost:8080/videos`;

    try {
      const res = await fetch(url);
      const data = await res.json();
      setVideos(data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const handleSearch = () => {
    const trimmed = query.trim();
    if (trimmed.length === 0 || trimmed.length > 10) {
      alert("Search must be 1–10 characters.");
      return;
    }
    fetchVideos(trimmed);
  };

  const handleReset = () => {
    setQuery("");
    setShowSearch(false);
    fetchVideos();
  };

  return (
    <main className="bg-black min-h-screen p-6 text-white">
      {/* Header Row */}
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-2xl font-bold">TeaseHub</h1>
        <button
          onClick={() => setShowSearch((prev) => !prev)}
          className="p-2 rounded-full bg-zinc-800 hover:bg-zinc-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-white"
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

{showSearch && (
  <div className="flex gap-2 mb-4 animate-fade-in">
    <input
      type="text"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Search"
      maxLength={10}
      className="bg-[#1e1e1e] text-[#ccc] placeholder-gray-500 px-3 py-2 rounded border border-[#333] w-full focus:outline-none focus:ring-1 focus:ring-gray-600"
    />
    <button
      onClick={handleSearch}
      className="bg-zinc-700 px-3 py-2 rounded hover:bg-zinc-600 text-sm text-white"
    >
      Search
    </button>
    <button
      onClick={handleReset}
      className="bg-zinc-800 px-3 py-2 rounded hover:bg-zinc-700 text-sm text-white"
    >
      ✕
    </button>
  </div>
)}


      {/* No results fallback */}
      {videos.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-20 text-center">
          <p className="text-gray-400 text-lg mb-4">No videos found for your search.</p>
          <button
            onClick={handleReset}
            className="bg-white text-black px-4 py-2 rounded-md hover:bg-gray-200 transition"
          >
            Go to Home
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {videos.map((video, idx) => (
            <VideoCard key={video.uuid + idx} video={video} />
          ))}
        </div>
      )}
    </main>
  );
}
