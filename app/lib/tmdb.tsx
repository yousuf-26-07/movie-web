import axios from "axios"; 

export default async function trendingmovies(){
    try{
        const res = await axios.get(`https://api.themoviedb.org/3/trending/movie/day?language=en-US`,{
            headers:{
                accept:"application/json",
                Authorization: `${process.env.NEXT_PUBLIC_TMDB_API_HEADER}`
            }
        })
        return res.data.results;
    }
    catch(error) {
        console.error("Error fetching popular movies:", error)
    }
}