import { Route, Routes } from "react-router-dom";
import { Header } from "./componentes/header/header";
import { Home } from "./componentes/views/home/home";
import { Detalle } from "./componentes/views/detalle/detalle";
import { AnimatePresence } from "framer-motion";
import { Motion } from "./componentes/motionDiv/motion";
import { useLocation } from "react-router-dom";
function App() {
  const location = useLocation();
  return (
    <div className="App">
      <Header />
      <AnimatePresence>
        <Routes location={location} key={(location.pathname, location.search)}>
          <Route
            path="/Movies-App/"
            element={
              <Motion>
                <Home />
              </Motion>
            }
          />
          <Route
            path="/Movies-App/:search/:movie"
            element={
              <Motion>
                <Home />
              </Motion>
            }
          />
          <Route
            path="/Movies-App/:genero"
            element={
              <Motion>
                <Home />
              </Motion>
            } />
          <Route
            path="/Movies-App/detalle"
            element={
              <Motion>
                <Detalle />
              </Motion>
            }
          />
        </Routes>
      </AnimatePresence>
    </div>
  );
}
export default App;
