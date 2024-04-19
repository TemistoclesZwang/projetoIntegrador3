import "./App.css";
import { LoginPage } from "./pages/LoginPage";
import { HomePage } from "./pages/HomePage";
// import YourComponent from './hooks/api/useGet'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MyRouter } from "./routes";
import { GMaps } from "./components/GoogleMapsApi";
import { NavBar } from "./components/NavBar";
import { Register } from "./components/Login/register";
import { LayoutManager } from "./hooks/App";

function App() {
  return (
    <>
 <BrowserRouter>
      <LayoutManager>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/register" element={<Register />} />
          {/* Adicione outras rotas conforme necessário */}
        </Routes>
      </LayoutManager>
    </BrowserRouter>
    </>
  );
}

export default App;
