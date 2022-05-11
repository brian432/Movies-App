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
        <Route path="/" element={<Home />} />
        <Route path="/:search/:movie" element={<Home />} />
        <Route path="/:genero" element={<Home />}/>
        <Route path="/detalle" element={<Detalle />} />
      </Routes>
    </div>
  );
}

export default App;
