import './App.css'
import {LoginPage} from './pages/LoginPage'
import { HomePage } from './pages/HomePage'
import YourComponent from './hooks/api/useGet'
import { BrowserRouter } from "react-router-dom";
import { MyRouter } from "./routes";
import { GMaps } from './components/GoogleMapsApi'; 



function App() {
  return (
    <>
      <BrowserRouter>

    {/* <LoginPage></LoginPage> */}
    {/* <HomePage></HomePage> */}
    <YourComponent></YourComponent>
    {MyRouter}
    </BrowserRouter>

    </>
  )
}

export default App
