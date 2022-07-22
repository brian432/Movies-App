import { useEffect, useState } from "react";
export const Detalle = () => {
    const [detalle, setDetalle] = useState([]);
    const [trailers, setTrailers] = useState([]);
    const [cast, setCast] = useState([]);
    const [imagenes, setImagenes] = useState([]);

    let query = new URLSearchParams(window.location.search);
    let movieID = query.get('movieID');

    const {
        REACT_APP_API_KEY: API_KEY,
        REACT_APP_API_MOVIE: API_MOVIE,
        REACT_APP_TRAILERS: TRAILERS,
        REACT_APP_IMG: IMG,
        REACT_APP_IMG_API_KEY: IMG_API_KEY,
        REACT_APP_CAST: CAST,
        REACT_APP_IMG_BACKGROUND: BACKGROUND_IMG,
        REACT_APP_IMG_POSTER: POSTER
    } = process.env
    useEffect(() => {
        json();
    }, [])

    const json = async () => {
        //movies
        let peticion = await fetch(`${API_MOVIE}${movieID}${API_KEY}`);
        let resultado = await peticion.json();
        setDetalle(resultado);

        //trailers
        let peticion1 = await fetch(`${API_MOVIE}${movieID}${TRAILERS}${API_KEY}`);
        let resultado1 = await peticion1.json();
        setTrailers(resultado1.results);

        //cast
        let peticion2 = await fetch(`${API_MOVIE}${movieID}${CAST}${API_KEY}`);
        let resultado2 = await peticion2.json();
        setCast(resultado2.cast.slice(0, 5));

        //imagens
        let peticion3 = await fetch(`${API_MOVIE}${movieID}${IMG}${IMG_API_KEY}`);
        let resultado3 = await peticion3.json();
        resultado3.backdrops.length > 0 ? setImagenes(resultado3.backdrops[0].file_path) : setImagenes(resultado3.posters[0][0].file_path)

    };
    return (
        <>
            <div className="background" style={imagenes && { backgroundImage: `url(${BACKGROUND_IMG}${imagenes})` }}>
            </div>
            <section id="Info">
                <div className="div-img">
                    <img src={`${POSTER}${detalle.poster_path}`} />
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
                                            <img src={actor.profile_path ? `${POSTER}${actor.profile_path}` : 'no-img.jpg'} />
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