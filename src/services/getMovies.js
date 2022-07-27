const {
    REACT_APP_API_KEY: API_KEY,
    REACT_APP_GENERO: GENERO,
    REACT_APP_API_MOVIE: API_MOVIE,
    REACT_APP_SEARCH: SEARCH,
    REACT_APP_POPULAR: POPULAR
} = process.env

export const getGenresMovies = async () => {
    const response = await fetch(`${GENERO}${API_KEY}`);
    const generos = await response.json();
    return generos
}

export const getMoviesDetails = async (movieID) => {
   const responseDetails = await fetch(`${API_MOVIE}${movieID}${API_KEY}&language=es`)
    const detalle = await responseDetails.json()

    //trailers
    const responseTrailers = await fetch(`${API_MOVIE}${movieID}/videos${API_KEY}&language=es`)
    const trailers = await responseTrailers.json()

    //cast
    const responseCast = await fetch(`${API_MOVIE}${movieID}/credits${API_KEY}&language=es`)
    const cast = await responseCast.json();

    //imagenes
    const responseImg = await fetch(`${API_MOVIE}${movieID}/images${API_KEY}`)
    const img = await responseImg.json()

    return { detalle, trailers, cast, img }
}

export const getPopularGenres = async (page, genero) => {
    const responsePopularGenres = await fetch(`${POPULAR}${page}&with_genres=${genero}`)
    const popularGenres = await responsePopularGenres.json()
    return popularGenres
}

export const getSearchMovie = async (movie, page) => {
    const responseSearch = await fetch(`${SEARCH}${movie}&page=${page}`);
    const search = await responseSearch.json();
    return search
}

