import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Expense from './components/Expense';
import { ToastContainer } from 'react-toastify';
import Welcome from './components/Welcome';

function App() {
  return (

    <div>
      <BrowserRouter>
            <Routes>
              <Route path='/' element= {<Welcome/>}></Route>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/expense" element={<Expense />} />
            </Routes>
          </BrowserRouter>
          <ToastContainer/>
    </div>
  );
}

export default App;
