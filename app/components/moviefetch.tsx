

"use client"
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import popularmovies from "@/app/lib/popular";
import { MovieCard } from "@/app/components/moviecards";

export default function moviefetch() {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const [movies, setMovies] = useState<any[]>([]);

  useEffect(() => {
    popularmovies(page).then((data) => setMovies(data || []));
  }, [page]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-2 p-10">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          id={movie.id}
          title={movie.title}
          poster={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          rating={movie.vote_average}
          year={movie.release_date}
        />
      ))}
    </div>
  );
}
