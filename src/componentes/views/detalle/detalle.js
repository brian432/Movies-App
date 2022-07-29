import { useMoviesDetails } from "../../../hooks/useMoviesDetails"

const { REACT_APP_IMG_BACKGROUND: BACKGROUND_IMG, REACT_APP_IMG_POSTER: POSTER } = process.env
export const Detalle = () => {
    const { detalle, trailers, cast, imagenes } = useMoviesDetails()
    return (
        <>
            <div className="background" style={imagenes && { backgroundImage: `url(${BACKGROUND_IMG}${imagenes})` }}>
            </div>
            <section id="Info">
                <div className="div-img">
                    <img src={`${POSTER}${detalle?.poster_path}`} alt={detalle?.title} />
                </div>
                <div className="informacion">
                    <p className="titulo">{detalle.title} <span className="puntaje">{detalle?.vote_average?.toFixed(1)}</span></p>
                    <p>Fecha de estreno: {detalle.release_date}</p>
                    <p className="descripcion">{detalle.overview}</p>
                    <div>
                        <h2>Cast</h2>
                        <div className="cast">
                            {
                                cast.map((actor, indice) =>
                                    <div key={indice} className="div-actores">
                                        <div className="div-img-actor">
                                            <img src={actor?.profile_path ? `${POSTER}${actor?.profile_path}` : 'no-img.jpg'} alt={actor.name} />
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
                        trailers.map((elemento, indice) =>
                            <div className="video-responsive" key={indice}>
                                <iframe
                                    key={indice}
                                    src={`https://www.youtube.com/embed/${elemento.key}`}
                                    title="YouTube video player"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            </div>
                        )
                    }
                </div>
            </section>
        </>
    )
}