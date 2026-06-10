"use client";
import { useEffect, useState } from "react";
import { MovieCard } from "../components/moviecards";
import moviesDetail from "../lib/moviedetail";

export default function FavouritesPage() {
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const getFavourites = async () => {
    try {
      const res = await fetch("/api/favourite", { method: "GET" });
    if (!res.ok) {
      const data = await res.json();
      alert(data.message);
      return;
    }

      const data = await res.json();
      const movies = await Promise.all(
        data.map((fav: any) => moviesDetail(fav.tmdbId))
      );
      setMovies(movies);
    } catch (err) {
      console.error("Error fetching favourites:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFavourites();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-8 text-center">
          ⭐ Your Favourites
        </h1>

        {loading ? (
          <p className="text-gray-400 text-center">Loading...</p>
        ) : movies.length === 0 ? (
          <p className="text-gray-400 text-center">
            You haven’t added any favourites yet.
          </p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 ">
            {movies.map((movie) => (
              <div
                key={movie.movie.id}
                className="transition-transform duration-300 hover:scale-101 hover:z-50"
              >
                <MovieCard
                  id={movie.movie.id}
                  title={movie.movie.title}
                  poster={`https://image.tmdb.org/t/p/w500${movie.movie.poster_path}`}
                  rating={movie.movie.vote_average}
                  year={movie.movie.release_date}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
