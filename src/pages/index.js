import { useEffect, useState } from "react";
import VideoCard from "../components/VideoCard";

export default function Home() {
  const [videos, setVideos] = useState([]);
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchVideos = async (q = "", pg = 1) => {
    const base = q
      ? `http://localhost:8080/search?q=${encodeURIComponent(q)}`
      : `http://localhost:8080/videos?page=${pg}&limit=8`;

    try {
      const res = await fetch(base);
      const data = await res.json();

      if (q) {
        setVideos(data);
        setTotalPages(1);
        setPage(1);
      } else {
        setVideos(data.videos);
        setPage(data.page);
        setTotalPages(data.totalPages);
      }
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchVideos("", page);
  }, [page]);

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
    fetchVideos("", 1);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  // Generate pagination range
  const visiblePages = 4;
  const start = Math.floor((page - 1) / visiblePages) * visiblePages + 1;
  const pages = Array.from(
    { length: Math.min(visiblePages, totalPages - start + 1) },
    (_, i) => start + i
  );

  return (
    <main className="bg-black min-h-screen p-6 text-white">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
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

      {/* Search Bar */}
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

      {/* No Results */}
      {videos.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-20 text-center">
          <p className="text-gray-400 text-lg mb-4">
            No videos found for your search.
          </p>
          <button
            onClick={handleReset}
            className="bg-white text-black px-4 py-2 rounded-md hover:bg-gray-200 transition"
          >
            Go to Home
          </button>
        </div>
      ) : (
        <>
          {/* Video Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {videos.map((video, idx) => (
              <VideoCard key={video.uuid + idx} video={video} />
            ))}
          </div>

          {/* Pagination */}
          {query === "" && totalPages > 1 && (
            <div className="flex justify-center items-center gap-2">
              <button
                onClick={() => handlePageChange(page - 1)}
                className="px-3 py-1 bg-zinc-700 rounded hover:bg-zinc-600"
                disabled={page === 1}
              >
                Prev
              </button>

              {pages.map((p) => (
                <button
                  key={p}
                  onClick={() => handlePageChange(p)}
                  className={`px-3 py-1 rounded ${
                    p === page
                      ? "bg-white text-black font-semibold"
                      : "bg-zinc-700 hover:bg-zinc-600"
                  }`}
                >
                  {p}
                </button>
              ))}

              <button
                onClick={() => handlePageChange(page + 1)}
                className="px-3 py-1 bg-zinc-700 rounded hover:bg-zinc-600"
                disabled={page === totalPages}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </main>
  );
}
