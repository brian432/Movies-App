import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search } from "../search/search";
const { REACT_APP_API_KEY: API_KEY, REACT_APP_GENERO: GENERO } = process.env

export const Header = () => {
    const [clases, setClases] = useState("");
    const [generos, setGeneros] = useState([]);
    const [menu, setMenu] = useState("");

    useEffect(() => {
        json()
    }, []);

    const json = async () => {
        let peticion = await fetch(`${GENERO}${API_KEY}`);
        let resultado = await peticion.json();
        setGeneros(resultado.genres);
    }

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
                        {generos.length > 0 && generos.map((elemento, indice) =>
                            <li key={indice}>
                                <Link to={`/Movies-App/${elemento.id}`} className="links hover" key={indice} onClick={(id) => handleClases(id)} name={elemento.name} id={elemento.id}>{elemento.name}</Link>
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