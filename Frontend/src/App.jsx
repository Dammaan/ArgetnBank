import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Client from "./pages/profile";
import Connexion from "./pages/login";


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