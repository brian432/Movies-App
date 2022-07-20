import { useEffect, useState } from "react";


export const Detalle = () => {
    const [detalle, setDetalle] = useState([]);
    const [trailers, setTrailers] = useState([]);
    const [cast, setCast] = useState([]);
    const [imagenes, setImagenes] = useState([]);

    let query = new URLSearchParams(window.location.search);
    let movieID = query.get('movieID');

    const API_MOVIE_ID = `https://api.themoviedb.org/3/movie/${movieID}?api_key=04c35731a5ee918f014970082a0088b1&language=es`

    //ApiTrailers
    const ApiTrailers = `https://api.themoviedb.org/3/movie/${movieID}/videos?api_key=04c35731a5ee918f014970082a0088b1&language=es`;
    const ApiCast = `https://api.themoviedb.org/3/movie/${movieID}/credits?api_key=04c35731a5ee918f014970082a0088b1&language=es`;
    //ApiImagenes
    const IMG_ORIGINAL_API = "https://image.tmdb.org/t/p/original";
    const ApiImagen = `https://api.themoviedb.org/3/movie/${movieID}/images?api_key=04c35731a5ee918f014970082a0088b1`;
    const IMG_API = "https://image.tmdb.org/t/p/w500";
    
    useEffect(() => {
        json();
    }, [])

    const json = async () => {
        //movies
        let peticion = await fetch(API_MOVIE_ID);
        let resultado = await peticion.json();
        setDetalle(resultado);

        //trailers
        let peticion1 = await fetch(ApiTrailers);
        let resultado1 = await peticion1.json();
        setTrailers(resultado1.results);

        //cast
        let peticion2 = await fetch(ApiCast);
        let resultado2 = await peticion2.json();
        setCast(resultado2.cast.slice(0, 5));

        //imagens
        let peticion3 = await fetch(ApiImagen);
        let resultado3 = await peticion3.json();
        resultado3.backdrops.length > 0 ? setImagenes(resultado3.backdrops[0].file_path) : setImagenes(resultado3.posters[0][0].file_path)
        
    };
    return (
        <>
            <div className="background" style={{ backgroundImage: `url(${IMG_ORIGINAL_API}${imagenes})` }}>
            </div>
            <section id="Info">
                <div className="div-img">
                    <img src={`${IMG_API}${detalle.poster_path}`} />
                </div>
                <div className="informacion">
                    <p className="titulo">{detalle.title} <span className="puntaje">{detalle.vote_average}</span></p>
                    <p>Fecha de estreno: {detalle.release_date}</p>
                    <p className="descripcion">{detalle.overview}</p>
                    <div>
                        <h2>Cast</h2>
                        <div className="cast">
                            {
                                cast && cast.map((actor, indice) =>
                                    <div key={indice} className="div-actores">
                                        <div className="div-img-actor">
                                            <img src={actor.profile_path ? `${IMG_API}${actor.profile_path}` : "no-img.jpg"} />
                                        </div>
                                        <p>{actor.name}</p>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
                <div className="div-trailers">
                    {
                        trailers.length > 0 &&
                        trailers.map((elemento, indice) =>
                            <div className="video-responsive">
                                <iframe key={indice} src={`https://www.youtube.com/embed/${elemento.key}`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                            </div>
                        )
                    }
                </div>
            </section>
        </>
    )
}