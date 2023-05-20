import axios from "axios";
import { useEffect , useState } from "react";
import {Link} from 'react-router-dom'
import avatar from '../avatar.png';
function People() {
    const [trendingMovies , setTrendingMovies] = useState([]);
    let a = new Array(13).fill(1).map((m , index)=>index+1);
    async function getMovie()
    {
        let {data} = await axios.get(`https://api.themoviedb.org/3/trending/person/day?api_key=eba8b9a7199efdcb0ca1f96879b83c44`)
        setTrendingMovies(data.results);

    }
    useEffect(()=>{
        getMovie();
    } , [])
    return ( <>
     <div>
    <div className="row py-2 text-center">
    <h2 className="h4 text-center py-2 fw-bold">The Trending Persons ..</h2>

    {trendingMovies.map((m,i)=> <div key={i} className="col-lg-2">
        <div className="person">
        <Link className="link" to={`/moviedetails/${m.id}`}>
        {m.profile_path === null? <img src={avatar} className="w-100 "/>:<img className="w-100" src={"https://image.tmdb.org/t/p/w500/"+m.profile_path} alt="" />}
            <h3 className="h5 p-2">{m.name}</h3>
            </Link>
        </div>
    </div>) }
    </div>
    </div>
    
    
    </> );
}

export default People;