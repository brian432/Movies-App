import { Route, Routes } from "react-router-dom";
import Header from "./componentes/header";
import Home from "./componentes/home";
import Detalle from "./componentes/detalle";
import './componentes/estilos/estilos.css';

function App() {
  
  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path="/Movies-App/" element={<Home />} />
        <Route path="/Movies-App/:search/:movie" element={<Home />} />
        <Route path="/Movies-App/:genero" element={<Home />}/>
        <Route path="/Movies-App/detalle" element={<Detalle />} />
      </Routes>
    </div>
  );
}

export default App;
