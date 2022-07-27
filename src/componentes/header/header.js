import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getGenresMovies } from "../../services/getMovies";
import { Search } from "../search/search";

export const Header = () => {
    const [clases, setClases] = useState("");
    const [generos, setGeneros] = useState([]);
    const [menu, setMenu] = useState("");

    useEffect(() => {
        getGenresMovies().then(generos =>setGeneros(generos.genres))
    }, []);

    const handleClases = () => {
        setClases("");
        setMenu("");
        window.scroll({
            top: 0,
        });
    }
    return (
        <header>
            <Link to="/Movies-App/" className="logo" onClick={() => window.scroll({ top: 0 })}>Peliculas</Link>
            <div className={`${menu !== '' ? 'nav-active container-generos' : 'container-generos'}`}>
                <div id="generos">
                    <p onClick={() => clases === "" ? setClases("click") : setClases("")} className={`${clases === "click" ? "rotacion" : ""} hover`}>Generos</p>
                    <ul className={`${clases === "" ? "" : "genero-active"} nav-links`}>
                        {generos.map((genero, indice) =>
                            <li key={indice}>
                                <Link to={`/Movies-App/${genero.id}`} className="links hover" key={indice} onClick={(id) => handleClases(id)} name={genero.name} id={genero.id}>{genero.name}</Link>
                            </li>
                        )}
                    </ul>
                </div>
                <Search />
            </div>
            <div id="hamburguesa" onClick={() => menu === "" ? setMenu("encendido") : setMenu("")}>
                <div className={menu === "" ? "" : "linea1"}></div>
                <div className={menu === "" ? "" : "linea2"}></div>
                <div className={menu === "" ? "" : "linea3"}></div>
            </div>
        </header>
    )
}