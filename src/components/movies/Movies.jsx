import axios from "axios";
import { useEffect , useState } from "react";
import {Link} from 'react-router-dom'

function Movies() {
    const [trendingMovies , setTrendingMovies] = useState([]);
    let a = new Array(13).fill(1).map((m , index)=>index+1);
    async function getMovie(page)
    {
        let {data} = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=eba8b9a7199efdcb0ca1f96879b83c44&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}`)
        setTrendingMovies(data.results);

    }
    useEffect(()=>{
        getMovie(1);
    } , [])
    return ( <>
    <div>
    <div className="row py-2 text-center">
        <h2 className="h4 text-center py-2 fw-bold">The Trending Movies ..</h2>
    {trendingMovies.map((m,i)=> <div key={i} className="col-lg-2">
        <div className="movie">
        <Link className="link" to={`/moviedetails/${m.id}`}>
            <img className="w-100" src={"https://image.tmdb.org/t/p/w500/"+m.poster_path} alt="" />
            <h3 className="h5 p-2">{m.title}</h3>
            </Link>
        </div>
    </div>) }
    </div>
    <nav aria-label="...">
        <ul className="pagination pagination-sm d-flex justify-content-center mouse">
           {a.map(( x , y )=><li onClick={()=>getMovie(x)} key={y} className="page-item"><a className="page-link bg-transparent text-white">{x}</a></li>)}
        </ul>
    </nav>
    </div>
    </> );
}

export default Movies;