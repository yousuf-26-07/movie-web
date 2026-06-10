

"use client";
import { useRouter } from "next/navigation";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import Image from "next/image";

export function ActorCard({ id, name, poster, character }) {
    const router = useRouter();
  return (
    <div onClick={() => router.push(`/actor/${id}`)}>
        <div className="grid justify-center items-start ">
  <Card className="max-w-sm mx-auto">
    <CardHeader shadow={false} floated={false} className="relative w-40 h-60">
      <Image
        src={`https://image.tmdb.org/t/p/w500${poster}`}
        alt={name}
        fill
        className="rounded-lg object-cover"
      />
    </CardHeader>
    <CardBody className="text-center flex flex-col items-center p-1">
      <div className=" flex flex-col items-center justify-center">
        <Typography color="blue-gray" className="font-bold text-sm mb-1">
          {name}
        </Typography>
        <Typography color="blue-gray" className="text-sm mb-1">
          {character}
        </Typography>
      </div>
    </CardBody>
  </Card>
</div>

</div>

    
  );
}

