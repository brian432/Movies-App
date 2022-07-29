import { Route, Routes } from "react-router-dom";
import { Header } from "./componentes/header/header";
import { Home } from "./componentes/views/home/home";
import { Detalle } from "./componentes/views/detalle/detalle";
import { AnimatePresence, motion } from "framer-motion";
import { useLocation } from "react-router-dom";
function App() {
  const location = useLocation();
  const pageTransition = {
    in: { opacity: 1 },
    out: { opacity: 0 }
  }
  return (
    <div className="App">
      <Header />
      <AnimatePresence>
        <Routes location={location} key={(location.pathname, location.search)}>
          <Route
            path="/Movies-App/"
            element={
              <motion.div
                className="page"
                initial="out"
                animate="in"
                exit="out"
                variants={pageTransition}
              >
                <Home />
              </motion.div>
            }
          />
          <Route
            path="/Movies-App/:search/:movie"
            element={
              <motion.div
                className="page"
                initial="out"
                animate="in"
                exit="out"
                variants={pageTransition}
              >
                <Home />
              </motion.div>
            }
          />
          <Route
            path="/Movies-App/:genero"
            element={
              <motion.div
                className="page"
                initial="out"
                animate="in"
                exit="out"
                variants={pageTransition}
              >
                <Home />
              </motion.div>
            } />
          <Route
            path="/Movies-App/detalle"
            element={
              <motion.div
                className="page"
                initial="out"
                animate="in"
                exit="out"
                variants={pageTransition}
              >
                <Detalle />
              </motion.div>
            }
          />
        </Routes>
      </AnimatePresence>
    </div>
  );
}
export default App;
