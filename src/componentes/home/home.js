import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const { REACT_APP_POPULAR: POPULAR, REACT_APP_SEARCH: SEARCH, REACT_APP_IMG_POSTER: POSTER } = process.env

export const Home = () => {
    const [movies, setMovies] = useState({});
    const history = useNavigate();

    let query = new URLSearchParams(window.location.search);
    let page = query.get('page');

    const { genero, search, movie } = useParams();
    useEffect(() => {
        typeof search !== 'undefined' ?
            jsonSearch() :
            json();
    }, [page, genero, search, movie]);

    //peticion a la api
    const json = async () => {
        let peticion = await fetch(`${POPULAR}${page}&with_genres=${genero}`);
        let resultado = await peticion.json();
        setMovies(resultado.results);
    }

    const jsonSearch = async () => {
        let peticion = await fetch(`${SEARCH}${movie}&page=${page}`);
        let resultado = await peticion.json();
        setMovies(resultado.results)
    }

    //manejo de eventos

    const handelClick = (e) => {
        history(`/Movies-App/detalle?movieID=${e}`);
    }

    const handlePage = (pagina) => {
        window.scroll({
            top: 0,
        });
        if (pagina === "+") {
            if (typeof search === 'undefined' && typeof genero === 'undefined') {
                page !== null ?
                    history(`/Movies-App/?page=${parseInt(page) + 1}`) :
                    history(`/Movies-App/?page=${2}`);
            } else if (typeof search !== 'undefined') {
                page !== null ?
                    history(`/Movies-App/${search}/${movie}?page=${parseInt(page) + 1}`) :
                    history(`/Movies-App/${search}/${movie}?page=${2}`);
            } else {
                page !== null ?
                    history(`/Movies-App/${genero}?page=${parseInt(page) + 1}`) :
                    history(`/Movies-App/${genero}?page=${2}`)
            }
        } else {
            typeof genero === 'undefined' && typeof search === 'undefined' ?
                history(`/Movies-App/?page=${parseInt(page) - 1}`) :
                typeof search !== 'undefined' ?
                    history(`/Movies-App/${search}/${movie}?page=${parseInt(page) - 1}`) :
                    history(`/Movies-App/${genero}?page=${parseInt(page) - 1}`)
        }
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
                {page > 1 && <button onClick={() => handlePage("-")}>anterior..</button>}
                {movies.length > 0 && <button onClick={() => handlePage("+")}>siguiente..</button>}
            </div>
        </div>
    )
}