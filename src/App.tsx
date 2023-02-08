import React from 'react';
import { Route, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { Footer } from './components/Footer';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import './styles/App.css';

// npm i react router dom=>Import BrowserRouter/react-router-dom;Route,Routes/react-router-dom' permettant de créer les routes du site-----------//

export const App = () => {
  return (
    <div className='App'>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </BrowserRouter>
      <Footer/>
    </div>
  );
};

export default App;
