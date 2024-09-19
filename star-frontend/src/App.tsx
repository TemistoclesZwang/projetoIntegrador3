import "./App.css";
// import YourComponent from './hooks/api/useGet'
import { BrowserRouter } from "react-router-dom";
import { MyRouter } from "./routes";
import { LayoutManager } from "./hooks/App";
import { AuthProvider } from "./context/Auth";
import { AutoUpdateProvider } from "./context/AutoUpdateContext/AutoUpdateContext";
import { VagasProvider } from "./context/TableValues/VagasContext";
import { TutorialProvider } from "./context/TutorialPopover";

function App() {
  return (
    <>
    <TutorialProvider>
      <VagasProvider>

      <AutoUpdateProvider>
    
      <AuthProvider>
        <BrowserRouter>
          <LayoutManager>
            {MyRouter} {/* Usar o MyRouter aqui */}
          </LayoutManager>
        </BrowserRouter>
      </AuthProvider>
      </AutoUpdateProvider>
      </VagasProvider>
      </TutorialProvider>

    </>
  );
}

export default App;
