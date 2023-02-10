import { createContext, useState, ReactElement } from 'react';

/**
 * Définition de l'interface de nos props
 */
interface AuthContextProps {
  children: ReactElement;
}

/**
 * Définition de l'interface pour notre context
 */
export interface AuthContextInterface {
  savedToken: string | null;
  onAuthChange: (token: string | null) => {};
  tokenFunction: (token: string | null) => {};
}

// /**
//  * Initialisation de notre context avec une première valeur (l'objet)
//  */
// export const AuthContext = createContext<AuthContextInterface>({
//   savedToken: null,
//   onAuthChange: (token: string | null) => void,
// });

// /**
//  * Création de notre composant provider de context
//  */
// export const AuthContextProvider = ({ children }: AuthContextProps) => {
//   //    * Mise en place de la logique interne de notre context
//   //    * Cela permet de mettre à dispo une fonction pour mettre
//   //    * à jour l'état de connection de notre utilisateur
//   //    * et d'accéder au token via notre context
//   //    */
//   let recupToken: string | null;
//   recupToken = localStorage.getItem('accesstoken');
//   const [token, setToken] = useState<string | null>(
//     recupToken ? recupToken : null
//   );
//   const [tokenExpired, setTokenExpired] = useState<string | null>(null);

//   const handleAuthChange = (token: string | null) => {
//     setToken(token);
//   };

//   const contextValue = {
//     savedToken: token,
//     validTimeToken: tokenExpired,
//     onAuthChange: handleAuthChange,
//   };

//   return (
//     <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
//   );
// };
