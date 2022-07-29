import { useNavigate } from "react-router-dom";
import { handlePage } from "../../../services/handlePage";
import Movies from "../../movies/movies";
import { useMovies } from "../../../hooks/useMovies";
import { useCallback } from "react";
export const Home = () => {
    const { movies, genero, search, page, movie } = useMovies()

    const navigate = useNavigate();

    const handelClick = useCallback((e) => {
        navigate(`/Movies-App/detalle?movieID=${e}`);
    }, [navigate])
    
    const handleClickPage = useCallback((e) => {
        e.target.name === "+" ?
            handlePage("+", search, movie, page, genero, navigate):
            handlePage("-", search, movie, page, genero, navigate)
    },[])
    return (
        <div className="container-home">
            <main className="home">
                {
                    movies.length > 0 ?
                        movies.map(pelicula =>
                            <Movies pelicula={pelicula} handelClick={handelClick} key={pelicula.id} />
                        ) :
                        <div id="SinResultados">Sin Resultados...</div>
                }
            </main>
            <div className="cambioPagina">
                {page > 1 && <button name="-" onClick={handleClickPage}>🢀 anterior</button>}
                {movies.length > 0 && <button name="+" onClick={handleClickPage}>siguiente 🢂</button>}
            </div>
        </div>
    )
}