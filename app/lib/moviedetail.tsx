import axios from "axios";
export default async function moviesDetail(movieid){
    try{
        const [res,crew] = await Promise.all([
            axios.get(`https://api.themoviedb.org/3/movie/${movieid}`,{
            headers:{
                accept:"application/json",
                Authorization: `${process.env.NEXT_PUBLIC_TMDB_API_HEADER}`
            }
        }),
            axios.get(`https://api.themoviedb.org/3/movie/${movieid}/credits?language=en-US`,{
            headers:{
                accept:"application/json",
                Authorization: `${process.env.NEXT_PUBLIC_TMDB_API_HEADER}`
            }
        })])
        return { movie: res.data, crew: crew.data.crew , cast: crew.data.cast };

    }
    catch(error){
        console.error("Error fetching movie details:", error)
    }
}