import { useState, useEffect } from "react";
import { getMoviesDetails } from "../services/getMovies";
export const useMoviesDetails = () => {
    const [detalle, setDetalle] = useState([]);
    const [trailers, setTrailers] = useState([]);
    const [cast, setCast] = useState([]);
    const [imagenes, setImagenes] = useState(null);

    let query = new URLSearchParams(window.location.search);
    let movieID = query.get('movieID');
    useEffect(() => {
        getMoviesDetails(movieID)
            .then(({ detalle, trailers, cast, img }) => {
                setDetalle(detalle)
                setTrailers(trailers.results)
                setCast(cast.cast.slice(0, 5))
                img.backdrops.length > 0 ?
                    setImagenes(img.backdrops[0].file_path) :
                    setImagenes(img.posters[0][0].file_path)
            })
    }, [])

    return { detalle, trailers, cast, imagenes }
}