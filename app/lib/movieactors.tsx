

import axios from "axios";
export default async function movieactors(movieid){
    try{
        const actors = await axios.get(`https://api.themoviedb.org/3/movie/${movieid}/credits?language=en-US`,{
            headers:{
                accept:"application/json",
                Authorization: `${process.env.NEXT_PUBLIC_TMDB_API_HEADER}`
            }
        })
        return actors.data.cast.results;
    }
    catch(error){
        console.error("Error fetching movie details:", error)
    }
}