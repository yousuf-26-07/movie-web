

"use client"
import { useState, useEffect } from "react"
import { IconButton } from "@material-tailwind/react"
import { HeartIcon } from "@heroicons/react/24/solid"

export default function FavouriteButton({ tmdbId }: { tmdbId: number }) {
  const [isFav, setIsFav] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchFavouriteStatus = async () => {
      const res = await fetch("/api/favourite")
      
      if (res.ok) {
        const data = await res.json()
        const found = data.some((item: any) => item.tmdbId === tmdbId)
        setIsFav(found)
      }
    }
    fetchFavouriteStatus()
  }, [tmdbId])
  
  const toggleFavourite = async () => {
    setLoading(true)
    const res = await fetch("/api/favourite", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tmdbId }),
    })
    if (res.ok) {
      const data = await res.json()
      setIsFav(data.isNew)
    }
    setLoading(false)
  }

  return (
    <IconButton
      onClick={toggleFavourite}
      disabled={loading}
      className="rounded-full p-4 shadow-xl hover:scale-110 transition-transform duration-200 flex items-center justify-center"
    >
      <HeartIcon className={`h-6 w-6 ${isFav ? "text-red-500" : "text-gray-400"}`} />
    </IconButton>
  )
}
