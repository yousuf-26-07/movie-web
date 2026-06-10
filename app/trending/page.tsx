import { MovieCard } from "../components/moviecards";
import trendingmovies from "../lib/tmdb";

export default async function TrendingPage() {
    const movies = await trendingmovies();
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-2 min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-6">
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
