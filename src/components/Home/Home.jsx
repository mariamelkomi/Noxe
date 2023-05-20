import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import avatar from '../avatar.png';
function Home () {

    const [trendingMovies , setTrendingMovies] = useState([]);
    const [trendingTv , setTrendingTv] = useState([]);
    const [trendingPeople , setTrendingPeople] = useState([]);

    async function getTrendingMovies(mediaType , callback)
    {
        let {data} = await axios.get(`https://api.themoviedb.org/3/trending/${mediaType}/day?api_key=eba8b9a7199efdcb0ca1f96879b83c44`)
        callback(data.results.splice(0,10))

    }
    useEffect(()=>{
        getTrendingMovies('movie' , setTrendingMovies)
        getTrendingMovies('tv' , setTrendingTv)
        getTrendingMovies('person' , setTrendingPeople)

    } , [])
    return ( <>
    <div className="row ">
        <div className="col-lg-4 align-items-center d-flex">
            <div className="">
            <div className="brdr w-25 mb-4"></div>
            <h2 className="h3">Trending <br/> Movies <br/> To watch right now </h2>
            <p className=" text-muted">Top Trending movies by Day</p>
            <div className="brdr mt-4"></div>
            </div>
        </div>
    {trendingMovies.map((m,i)=> <div key={i} className="col-lg-2">
        <div className="movie text-center">
        <Link className="link" to={`/moviedetails/${m.id}`}>
            <img className="w-100" src={"https://image.tmdb.org/t/p/w500/"+m.poster_path} alt="" />
            <h3 className="h5 p-2">{m.title}</h3>
            </Link>
        </div>
    </div>) }

    </div>
    <div className="row py-5">
        <div className="col-lg-4 align-items-center d-flex">
            <div className="">
            <div className="brdr w-25 mb-4"></div>
            <h2 className="h3">Trending <br/> Person <br/> To watch right now </h2>
            <p className=" text-muted">Top Trending Persons by Day</p>
            <div className="brdr mt-4"></div>
            </div>
        </div>
    {trendingPeople.map((m,i)=> <div key={i} className="col-lg-2 text-center">
    <Link className="link" to={`/moviedetails/${m.id}`}>
        {m.profile_path === null? <img src={avatar} className="w-100"/>:<img className="w-100" src={"https://image.tmdb.org/t/p/w500/"+m.profile_path} alt="" />}
            <h3 className="h5 p-2">{m.name}</h3>
            </Link>
           
    </div>) }

    </div>
    <div className="row">
        <div className="col-lg-4 align-items-center d-flex">
            <div className="">
            <div className="brdr w-25 mb-4"></div>
            <h2 className="h3">Trending <br/> Tv <br/> To watch right now </h2>
            <p className=" text-muted">Top Trending Tv by Day</p>
            <div className="brdr mt-4"></div>
            </div>
        </div>
    {trendingTv.map((m,i)=> <div key={i} className="col-lg-2">
        <div className="movie text-center">
            <Link className="link" to={`/moviedetails/${m.id}`}>
            <img className="w-100" src={"https://image.tmdb.org/t/p/w500/"+m.poster_path} alt="" />
            <h3 className="h5 p-2">{m.name}</h3>
            </Link>
            
        </div>
    </div>) }

    </div>
    </> );
}

export default Home ;