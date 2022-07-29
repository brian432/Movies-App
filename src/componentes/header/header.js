import { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getGenresMovies } from "../../services/getMovies";
import { scroll } from "../../services/scroll";
import Search from "../search/search";

export const Header = () => {
    const [clases, setClases] = useState("");
    const [generos, setGeneros] = useState([]);
    const [menu, setMenu] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
        getGenresMovies().then(generos => setGeneros(generos.genres))
    }, []);

    const handleClases = useCallback(() => {
        setClases("");
        setMenu("");
        scroll()
    },[])

    const handleMenu = useCallback(() => {
        menu === "" ? setMenu("encendido") : setMenu("")
    },[])

    const handleSubmit = useCallback((search) => {
        setMenu("")
        navigate(`/Movies-App/search/${search}`)
    }, [navigate])

    return (
        <header>
            <Link to="/Movies-App/" className="logo" onClick={handleClases}>Peliculas</Link>
            <div className={`${menu !== '' ? 'nav-active container-generos' : 'container-generos'}`}>
                <div id="generos">
                    <p onClick={() => clases === "" ? setClases("click") : setClases("")} className={`${clases === "click" ? "rotacion" : ""} hover`}>Generos</p>
                    <ul className={`${clases === "" ? "" : "genero-active"} nav-links`}>
                        {generos.map((genero, indice) =>
                            <li key={indice}>
                                <Link to={`/Movies-App/${genero.id}`} className="links hover" key={indice} onClick={handleClases} name={genero.name} id={genero.id}>{genero.name}</Link>
                            </li>
                        )}
                    </ul>
                </div>
                <Search onSubmit={handleSubmit} />
            </div>
            <div id="hamburguesa" onClick={handleMenu}>
                <div className={menu === "" ? "" : "linea1"}></div>
                <div className={menu === "" ? "" : "linea2"}></div>
                <div className={menu === "" ? "" : "linea3"}></div>
            </div>
        </header>
    )
}