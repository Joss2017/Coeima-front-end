import React, { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router';
import { BrowserRouter, useLocation } from 'react-router-dom';
import { Footer } from '../components/footer/Footer';
import { Navbar } from '../components/navbar/Navbar';
import { Account } from '../pages/account/Account';
import { Topic } from '../pages/forum/Topic';
import { Home } from '../pages/home/Home';
import { Offer } from '../pages/offer/Offer';
import { Login } from '../pages/connection/Login';
import { Register } from '../pages/connection/Register';
import { AuthContext } from '../context/AuthContext';
import './App.css';

// npm i react router dom=>Import BrowserRouter/react-router-dom;Route,Routes/react-router-dom' permettant de créer les routes du site-----------//

export const App = () => {
  const { savedToken } = useContext(AuthContext);

  return (
    <>
      <div className='app-container'>
        <BrowserRouter>
          <Navbar />

          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/offer' element={<Offer />} />
            <Route path='/topic' element={<Topic />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route
              path='/account'
              element={
                savedToken !== null ? <Account /> : <Navigate to='/login' />
              }
            />
          </Routes>
          <Footer />
        </BrowserRouter>
      </div>
    </>
  );
};

export default App;
