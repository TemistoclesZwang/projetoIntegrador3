// import React from "react";
// import { Routes, Route, Navigate } from "react-router-dom";
// // import { NotFound } from "../pages/NotFound";
// // import { useAuth } from "../context/AuthContext";
// import { LoginPage } from "../assets/pages/LoginPage";

// interface ProtectedRouteProps {
//   element: React.ReactNode;
// }

// export function ProtectedRoute({ element }: ProtectedRouteProps) {
//   const { isLoggedIn } = useAuth();

//   if (isLoggedIn) {
//     return element;
//   }

//   return <Navigate to="/LoginPage" />;
// }

// export const MyRouter = (
//     <Routes>
//       <Route path="/" element={<LoginPage />} />
//       <Route path="/register/*" element={<RegistrationPage />} />
//       <Route path="/pedidos/:parametro" element={<Pedidos />} />
//       <Route path="/pagamento/*" element={<Pay />} />
//       <Route path="/about/*" element={<ProtectedRoute element={<About />} />} />
//       <Route path="*" element={<NotFound />} />
//       <Route path="/cardapio/*" element={<ProtectedRoute element={<Menu />} />}
//       />
//     </Routes>
// );
