import Acceuil from './Page/Acceuil.jsx'
import {Route , Routes} from "react-router-dom"
import './App.css'
function App() {
  return (
    <>
      <div className='App'>
        <Routes>
          <Route path={"/"} element={<Acceuil />} />
        </Routes>
      </div>
    </>
  )
}

export default App
