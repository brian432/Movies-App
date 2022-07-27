import { useNavigate } from "react-router-dom";
import { handlePage } from "../../../services/handlePage";
import { Movies } from "../../movies/movies";
import { useMovies } from "../../../hooks/useMovies";
export const Home = () => {
    const { movies, genero, search, page, movie } = useMovies()
    console.log(movies);
    const navigate = useNavigate();
    const handelClick = (e) => {
        navigate(`/Movies-App/detalle?movieID=${e}`);
    }
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
                {page > 1 && <button onClick={() => handlePage("-", search, movie, page, genero, navigate)}>anterior..</button>}
                {movies.length > 0 && <button onClick={() => handlePage("+", search, movie, page, genero, navigate)}>siguiente..</button>}
            </div>
        </div>
    )
}