"use client";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardBody, Typography } from "@material-tailwind/react";
import Image from "next/image";

export function MovieCard({ id, title, poster, rating, year }: any) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/movie/${id}`)}
      className="relative cursor-pointer transition-transform duration-300 hover:scale-105 hover:z-50"
    >
      <Card className="w-64 bg-gray-800 shadow-lg rounded-xl overflow-hidden flex flex-col h-[28rem]">
        <CardHeader className="relative w-full h-82 flex-shrink-0">
          <Image
            src={poster}
            alt={title}
            fill
            className="object-cover"
          />
        </CardHeader>
        <CardBody className="flex flex-col items-center justify-between p-4 text-center h-[7rem]">
          <Typography
            className="font-bold text-lg text-white overflow-hidden overflow-ellipsis whitespace-nowrap"
            title={title} // hover tooltip
          >
            {title}
          </Typography>
          <div>
            <Typography className="text-yellow-400 font-semibold mt-1">
              ⭐ {rating}/10
            </Typography>
            <Typography className="text-gray-400 text-sm mt-1">{year}</Typography>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
