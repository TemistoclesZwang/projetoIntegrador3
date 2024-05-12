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
import { Vagas } from "./pages/Vagas";
import { Estatisticas } from "./pages/Estatisticas";
import { AuthProvider } from "./context/Auth";
import { AutoUpdateProvider } from "./context/AutoUpdateContext/AutoUpdateContext";

function App() {
  return (
    <>
      <AutoUpdateProvider>
    
      <AuthProvider>
        <BrowserRouter>
          <LayoutManager>
            {MyRouter} {/* Usar o MyRouter aqui */}
          </LayoutManager>
        </BrowserRouter>
      </AuthProvider>
      </AutoUpdateProvider>

    </>
  );
}

export default App;
