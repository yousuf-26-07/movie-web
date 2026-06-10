"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import { MoviesDropdown } from "./moviesdropdown";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import unnamed from '../../public/unnamed.jpg';

export default function TopBar() {
  const { data: session, status } = useSession();
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (query.trim() !== "") {
      window.location.href = `/search?query=${encodeURIComponent(query)}`;
    }
  };

  return (
    <div className="bg-gray-800 text-white p-2 flex items-center gap-4 relative">
      {/* Logo */}
      <div>
        <Image src={unnamed} alt="Movie Icon" width={40} height={40} className="rounded-2xl" />
      </div>

      {/* Dropdown */}
      <MoviesDropdown />

      {/* TV Shows */}
      <button className="ml-2 px-3 py-1 rounded hover:bg-gray-700">TV Shows</button>

      {/* Spacer */}
      <div className="flex-1"></div>

      {/* Search + Session */}
      <div className="flex items-center gap-3 relative">
        {/* Search Icon */}
        <div className="relative">
          <button
            className="p-2 rounded hover:bg-gray-700"
            onClick={() => setShowSearch(!showSearch)}
          >
            <MagnifyingGlassIcon className="h-6 w-6" />
          </button>

          {showSearch && (
            <div className="absolute top-10 right-0 flex gap-1 w-96 bg-gray-700 p-2 rounded shadow-lg z-50">
              <input
                type="text"
                placeholder="Search movies..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 px-3 py-2 rounded-l bg-gray-600 text-white focus:outline-none"
              />
              <button
                onClick={handleSearch}
                className="bg-blue-600 px-5 py-2 rounded-r hover:bg-blue-700"
              >
                Search
              </button>
            </div>
          )}
        </div>

        {/* Session info */}
        {status === "loading" ? (
          <span>Loading...</span>
        ) : session ? (
          <>
            <span className="font-bold">Welcome {session.user?.name || session.user?.email}</span>
            <button
              className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700"
              onClick={() => signOut()}
            >
              Logout
            </button>
          </>
        ) : (
          <button
            className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700"
            onClick={() => signIn()}
          >
            Login
          </button>
        )}
      </div>
    </div>
  );
}
