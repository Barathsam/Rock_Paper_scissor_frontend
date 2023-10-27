import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Game from './game'
import User from './User'


const App = () => {
  return (
  <>
  
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<User/>}/>
      <Route path="/game" element={<Game/>}/>
    </Routes>
  </BrowserRouter>
  </>)
  
}

export default App
