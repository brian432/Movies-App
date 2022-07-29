import React from "react"
const { REACT_APP_IMG_POSTER: POSTER } = process.env
const Movies = ({ pelicula, handelClick }) => {
    return (
            <div className="cuadros" key={pelicula.id} onClick={() => handelClick(pelicula.id)}>
                <div className="div-img">
                    <img src={pelicula.poster_path ? `${POSTER}${pelicula.poster_path}` : 'no-img.jpg'} alt={pelicula.title} />
                </div>
                <div className="descripcion">
                    <h3>{pelicula.original_title}</h3>
                    <span>{pelicula.vote_average}</span>
                </div>
            </div>
    )
}
export default React.memo(Movies)