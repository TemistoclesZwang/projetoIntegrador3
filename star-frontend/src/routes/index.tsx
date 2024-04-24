import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
// import { NotFound } from "../pages/NotFound";
// import { useAuth } from "../context/AuthContext";
import { HomePage } from "../pages/HomePage";
import { Vagas } from "../pages/Vagas";
import { LoginPage } from "../pages/LoginPage";
import { Register } from "../components/Login/register";
import { Estatisticas } from "../pages/Estatisticas";
import { useAuth } from "../context/Auth";

const ProtectedRoute = ({ children }:{children:React.ReactNode}) => {
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    console.log("Status de login atualizado em ProtectedRoute: ", isLoggedIn);
  }, [isLoggedIn]);

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return children;
};

export const MyRouter = (

    <Routes>
      {/* <Route path="/" element={<LoginPage />} /> */}
      {/* <Route path="/register/*" element={<RegistrationPage />} /> */}
      {/* <Route path="/pedidos/:parametro" element={<Pedidos />} /> */}
      <Route path="/home/*" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
      <Route path="/vagas/*" element={<ProtectedRoute><Vagas /></ProtectedRoute>} />
      <Route path="/login/*" element={<LoginPage />} />
      <Route path="/register/*" element={<Register />} />
      <Route path="/estatisticas/*" element={<ProtectedRoute><Estatisticas /></ProtectedRoute>} />
      
      {/* <Route path="/about/*" element={<ProtectedRoute element={<About />} />} /> */}
      {/* <Route path="*" element={<NotFound />} /> */}
      {/* <Route path="/cardapio/*" element={<ProtectedRoute element={<Menu />} />} */}
      {/* /> */}
    </Routes>
);
