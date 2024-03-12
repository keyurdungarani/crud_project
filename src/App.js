
import './App.css';
import Create from './components/Create';
// import Index from './components/Index';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Read from './components/Read';
import Update from './components/Update';

function App() {
  return (
    <BrowserRouter>

      <Routes>
        <Route exact path='/' element={<Create />}></Route>
        <Route path='/read' element={<Read />}></Route>
        <Route path='/update' element={<Update />}></Route>
        {/* <Index />  */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
