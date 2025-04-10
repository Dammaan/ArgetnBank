import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Client from "./pages/Client";
import Connexion from "./pages/Connexion";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/client" element={<Client />} />
      <Route path="/sign-in" element={<Connexion />} />
    </Routes>
  );
}

export default App;