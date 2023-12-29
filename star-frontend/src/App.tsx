import './App.css'
import {LoginPage} from './pages/LoginPage'
import { HomePage } from './pages/HomePage'
import YourComponent from './hooks/api/useGet'

function App() {
  return (
    <>
    {/* <LoginPage></LoginPage> */}
    <HomePage></HomePage>
    <YourComponent></YourComponent>
    </>
  )
}

export default App
