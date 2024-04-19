import { useLocation } from "react-router-dom";
import { NavBar } from "../../components/NavBar"

export function LayoutManager({ children }: { children: React.ReactNode }) {
  // Lista de caminhos que não devem mostrar a NavBar
  const noNavBarRoutes = ["/", "/login", "/register", "/about", "/home"];

  const location = useLocation();
  const showNavBar = !noNavBarRoutes.includes(location.pathname);

  return (
    <>
      {showNavBar && <NavBar />}
      {children}
    </>
  );
}
