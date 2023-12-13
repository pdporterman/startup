import React from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Play } from './play/play';
import { Scores } from './scores/scores';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

function App() {
  
  return (
    <BrowserRouter>
      <div className='body bg-dark text-light'>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/play' element={<Play />} />
          <Route path='/scores' element={<Scores />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
    

        <footer className='bg-dark text-dark text-muted'>
          <div className='container-fluid'>
            <span className='text-reset'>Author Name(s)</span>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

function NotFound() {
  return <main className='container-fluid bg-secondary text-center'>404: Return to sender. Address unknown.</main>;
}

export default App;