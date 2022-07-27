import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getSearchMovie, getPopularGenres } from "../services/getMovies";
export const useMovies = () => {
    const [movies, setMovies] = useState({});
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
    return { movies, genero, search, movie, page}
}