import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPopularGenres, getSearchMovie } from "../../../services/getMovies";
import { handlePage } from "../../../services/handlePage";
const { REACT_APP_IMG_POSTER: POSTER } = process.env

export const Home = () => {
    const [movies, setMovies] = useState({});
    const navigate = useNavigate();

    let query = new URLSearchParams(window.location.search);
    let page = query.get('page');
    const { genero, search, movie } = useParams();

    useEffect(() => {
        typeof search !== 'undefined' ?
            getSearchMovie(movie, page)
                .then((search) => setMovies(search.results)) :
            getPopularGenres(page, genero)
                .then((popularGenres) => setMovies(popularGenres.results))
    }, [page, genero, search, movie]);

    const handelClick = (e) => {
        navigate(`/Movies-App/detalle?movieID=${e}`);
    }
    return (
        <div className="container-home">
            <main className="home">
                {movies.length > 0 ?
                    movies.map((pelicula, indice) =>
                        <div className="cuadros" key={indice} onClick={() => handelClick(pelicula.id)}>
                            <div className="div-img">
                                <img src={pelicula.poster_path ? `${POSTER}${pelicula.poster_path}` : 'no-img.jpg'} alt={pelicula.title} />
                            </div>
                            <div className="descripcion">
                                <h3>{pelicula.original_title}</h3>
                                <span>{pelicula.vote_average}</span>
                            </div>
                        </div>
                    ) :
                    <div id="SinResultados">Sin Resultados...</div>}
            </main>
            <div className="cambioPagina">
                {page > 1 && <button onClick={() => handlePage("-", search, movie, page, genero, navigate)}>anterior..</button>}
                {movies.length > 0 && <button onClick={() => handlePage("+", search, movie, page, genero, navigate)}>siguiente..</button>}
            </div>
        </div>
    )
}