import {scroll} from '../services/scroll'
export const handlePage = (pagina, search, movie, page, genero, navigate) => {
    scroll()
    if (pagina === "+") {
        if (typeof search === 'undefined' && typeof genero === 'undefined') {
            page !== null ?
                navigate(`/Movies-App/?page=${parseInt(page) + 1}`) :
                navigate(`/Movies-App/?page=${2}`);
        } else if (typeof search !== 'undefined') {
            page !== null ?
                navigate(`/Movies-App/${search}/${movie}?page=${parseInt(page) + 1}`) :
                navigate(`/Movies-App/${search}/${movie}?page=${2}`);
        } else {
            page !== null ?
                navigate(`/Movies-App/${genero}?page=${parseInt(page) + 1}`) :
                navigate(`/Movies-App/${genero}?page=${2}`)
        }
    } else {
        typeof genero === 'undefined' && typeof search === 'undefined' ?
            navigate(`/Movies-App/?page=${parseInt(page) - 1}`) :
            typeof search !== 'undefined' ?
                navigate(`/Movies-App/${search}/${movie}?page=${parseInt(page) - 1}`) :
                navigate(`/Movies-App/${genero}?page=${parseInt(page) - 1}`)
    }
}