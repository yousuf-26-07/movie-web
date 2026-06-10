"use client"
import React, { use, useEffect } from "react";
import { Button, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useRouter, useSearchParams } from "next/navigation";
import popularmovies from "../lib/popular";

export function CircularPagination() {
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const [active, setActive] = React.useState(currentPage);
  const router = useRouter();

  const fetchmovie = (page: number) => {
    router.push(`/?page=${page}`);
    setActive(page);
  };

  useEffect(()=>{
    async function fetchData(){
        const data = await popularmovies(active);
        console.log(data);
    }
  },[active])

  const getItemProps = (index: number) => ({
    onClick: () => fetchmovie(index),
    className: `
      rounded-full w-10 h-10 flex items-center justify-center
      ${active === index 
        ? "bg-gray-900 text-white shadow-lg" 
        : "bg-gray-200 text-gray-700 hover:bg-gray-300"}
    `,
  });

  const next = () => {
    if (active < 5) fetchmovie(active + 1);
  };

  const prev = () => {
    if (active > 1) fetchmovie(active - 1);
  };

  // sync state if user refreshes or comes with a URL like ?page=3
  useEffect(() => {
    setActive(currentPage);
  }, [currentPage]);

  return (
    <div className="flex items-center gap-4 justify-center pb-5 ">
      <Button
        variant="text"
        className="flex items-center gap-2 rounded-full cursor-pointer"
        onClick={prev}
        disabled={active === 1}
      >
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
      </Button>

      <div className="flex items-center gap-2">
        {[1, 2, 3, 4, 5].map((num) => (
          <IconButton key={num} {...getItemProps(num)}>
            {num}
          </IconButton>
        ))}
      </div>

      <Button
        variant="text"
        className="flex items-center gap-2 rounded-full cursor-pointer"
        onClick={next}
        disabled={active === 5}
      >
        Next
        <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
      </Button>
    </div>
  );
}
