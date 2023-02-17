import jwtDecode from 'jwt-decode';
import { createContext, ReactElement, useEffect, useState } from 'react';
import { axiosPublic } from '../api/Axios';
import { PayLoadTokenProps, UserTypeProps } from '../interface/Interface';

//---------------------------------Définition de l'interface de nos props-----------------------------------------------------------------//

interface UserContextProps {
  children: ReactElement;
}

//---------------------------------Définition de l'interface pour notre context-----------------------------------------------------------//

export interface AuthContextInterface {
  connectedUser: UserTypeProps | undefined | null; // récupérer le user connecté
  savedToken: string | null; // Token sauvegardé dans le context
  setAuthChange: (token: string | null) => void; // Fonction pour changer le token sauvegardé dans le context
}
//--------------------------- Initialisation de notre context avec une première valeur (l'objet)-----------------------------------------//

export const AuthContext = createContext<AuthContextInterface>({
  connectedUser: null,
  savedToken: null,
  setAuthChange: (token: string | undefined | null) => {},
});

/**
 * Mise en place de la logique interne de notre context
 * Cela permet de mettre à dispo une fonction pour mettre
 * à jour l'état de connection de notre utilisateur
 * et d'accéder au token via notre context
 */

export const AuthContextProvider = ({ children }: UserContextProps) => {
  //----------------------------Recuperation de l'utilisateur connecté et stockage de celui-ci dans un useState------------------------//
  const [user, setUser] = useState<UserTypeProps | null | undefined>(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem('token') || null
  );

  const searchUser = () => {
    if (token) {
      let tokenDecoded: PayLoadTokenProps = jwtDecode(token);
      console.log('token///////////', token);
      console.log('tokenDecoded.id///////////', tokenDecoded.id);
      return tokenDecoded.id;
    }
  };

  //----Mise en place du useEffect + requete get  afin de ne pas perdre l'utilisateur connecté lors d'une reactualisation de la page----//

  useEffect(() => {
    let userSearchId = searchUser();
    axiosPublic
      .get(`/user/${userSearchId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log('response*', response);
        setUser(response.data);
      })
      .catch((error) => {
        console.log('error', error.response.data.statusCode);
        if (error.response.data.statusCode === 401) {
          localStorage.removeItem('token');
        }
      });
  }, [token]);
  console.log('verification de user-------------', user);

  //-----------mise en place de la fonction qui recupera l'utilisateur co dans la main de facon dynamique--------------------------------//

  const userContextValue = {
    connectedUser: user,
    setAuthChange: setToken,
    savedToken: token,
  };
  console.log(
    "voici l'utilisateur connecté..........",
    userContextValue.connectedUser
  );

  //--Dans le return nous declarons quelle sera la valeur retourné a nos enfants grace a notre provider via la synthaxe suivante---- ------//
  return (
    <AuthContext.Provider value={userContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
