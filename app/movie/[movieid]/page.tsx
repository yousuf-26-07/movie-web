"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Typography } from "@material-tailwind/react";
import IMDbRating from "@/app/components/imbdic";
import moviesDetail from "@/app/lib/moviedetail";
import { ActorCard } from "@/app/components/actorscard";
import FavouriteButton from "@/app/components/favouriteicon";


export default function MoviePage({ params }: { params: { movieid: string } }) {
  const [movie, setMovie] = useState(null);
  const [crew, setCrew] = useState(null);
  const [cast, setCast] = useState(null);
  useEffect(() => {
    async function fetchMovie() {
      const data = await moviesDetail(params.movieid);
      setMovie(data?.movie);
      setCrew(data?.crew);
      setCast(data?.cast);
    }
    fetchMovie();
  }, [params.movieid]);

  if (!movie) return <p>Loading...</p>;

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-3 p-6 items-start  bg-gradient-to-b from-gray-900 to-black text-white">
        <div className="relative h-85 aspect-[2/3]">
          <Image
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            width={250}
            height={375}
            className="rounded-lg object-cover"
          />
        </div>
        <div className="flex flex-col">
          <Typography
            variant="h5"
            className="font-extrabold text-xl md:text-2xl text-white hover:text-gray-500 cursor-pointer transition-colors duration-200 inline-block"
          >
            {movie.title} ({movie.release_date?.split("-")[0]})
          </Typography>

          <div className="flex gap-3">
            <Typography variant="small" className="text-gray mt-1">
              {movie.release_date}
            </Typography>

            <Typography variant="small" className="text-gray mt-1">
              {movie.genres?.map((g: any) => g.name).join(", ")}
            </Typography>

            <Typography className="text-gray mt-1" variant="small">
              {movie.runtime} mins
            </Typography>
          </div>


          <div className="flex mt-3 pt-0.5">
            <IMDbRating rating={movie.vote_average} />
            <div >
              <FavouriteButton tmdbId={movie.id} />

            </div>
          </div>
          <div>
            <Typography className="text-gray-500 mt-4 italic ">
              {movie.tagline}
            </Typography>
          </div>
          <div className="mt-1 font-bold">
            Overview
          </div>
          <div>
            <Typography className="text-gray-700 mt-2 text-white">
              {movie.overview}
            </Typography>
          </div>
          <div className="flex flex-row gap-50">
            <div>
              <Typography className="text-white mt-3 font-bold">
                {crew.map((c: any) => (c.job === "Director" && c.name))}
              </Typography>
              <div className=" text-gray-500">
                Director
              </div>
            </div>

            <div>
              <Typography className="text-white mt-3 font-bold">
                {crew.filter((c: any) => c.job === "Producer").slice(0, 2).map((p: any) => p.name).join(" , ")}
              </Typography>

              <div className=" text-gray-500">
                Producer
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex overflow-x-auto gap-3 pl-6 ">
        {cast.slice(0, 10).map((actor: any) => (
          <ActorCard
            key={actor.id}
            id={actor.id}
            name={actor.name}
            poster={actor.profile_path}
            character={actor.character}
          />
        ))}
      </div>

    </div>
  );
}

