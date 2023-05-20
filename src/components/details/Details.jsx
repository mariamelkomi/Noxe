import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


function Details() {
    let p = useParams();
    const [details , setDetails] = useState([]);
    async function getDetails(id){
        let {data} = await axios.get(`https://api.themoviedb.org/3/movie/${id}$?api_key=eba8b9a7199efdcb0ca1f96879b83c44`)
        setDetails(data)
    }
    useEffect(()=> 
    {
        getDetails(p.id);

    }
    , [])
    return ( <>
    {details? <div className="row py-5">
    <h2 className="h4 text-center py-2 fw-bold">More Details ..</h2>

        <div className="col-lg-4">
            <img className="w-100" src={"https://image.tmdb.org/t/p/w500/"+details.poster_path} alt="" />
        </div>
        <div className="col-lg-8 d-flex align-items-center">
            <div>
            <h2 className="h3">{details.title}</h2>
            <p className=" text-muted">{details.overview}</p>
            </div>
        </div>

    </div>:<div className=" d-flex justify-content-center align-items-center vh-100">
        <i className=" fas fa-spinner fa-spin fa-3x"></i>
        </div>}
   
    </> );
}

export default Details;