import axios, { AxiosResponse } from 'axios';
import React, { FormEvent, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

export const Login = () => {
  //---------------------------------------------Eléments d'états----------------------------------//

  const userRef = useRef(null);
  const errRef = useRef(null);

  //--- ------------------------------------------Eléments d'états-----------------------------------//

  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [errMessage, setErrMessage] = useState('');
  //--- ------------------------------------------Type booléen-----------------------------------//

  const [success, setSuccess] = useState(false);

  useEffect(() => {}, []);

  useEffect(() => {
    setErrMessage('');
  }, [user, password]);

  return <div></div>;
};
