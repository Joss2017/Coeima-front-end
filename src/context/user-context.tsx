import axios from "axios";
import jwtDecode from "jwt-decode";
import { createContext,ReactElement, useEffect, useState } from "react";
import { UserProps } from "../interface/Interface";
import { PayLoadTokenProps } from "./Payload-Interface";





// Mise en place d'un context afin de recuperer les données de l'utilisateur connecté sur l'ensemble des composants et page de l'APP
interface UserContextProps {
    children: ReactElement;
}
//  Interface avec le typage de la valeur qu'on va envoyer aux enfants du context

export interface UserContextInterface {
  connectedUser: UserProps | undefined | null;
  onUserChange: (user: UserProps | undefined | null) => void;
}

//  Creation du context en l'initialisant avec une valeur initiale
export const UserContext = createContext<UserContextInterface>({
  connectedUser: null,
  onUserChange: (user: UserProps | undefined | null) => {},
});

    //  Mise en place de la  logique afin de recuperer les informations qui sera ensuite partager aux enfants par le provider

    export const UserContextProvider = ({children}:UserContextProps)=>{
      // Recuperation de l'utilisateur connecté et stockage de celui-ci dans un useState
       let connectedUser: UserProps | undefined | null;
      const [user, setUser] = useState<UserProps | null | undefined>(
        connectedUser ? connectedUser : null
      );
      let recupToken = localStorage.getItem("accessToken");
      const searchUser = () => {
        if (recupToken) {
          let tokenDecoded: PayLoadTokenProps = jwtDecode(recupToken);
          console.log("tokenDecoded.id///////////", tokenDecoded.id);
          return tokenDecoded.id;
        }
      };
       let userSearchId: string | undefined = searchUser();
      //  mise en place du useEffect + requete get  afin de ne pas perdre l'utilisateur connecté lors d'une reactualisation de la page-------//
        
        useEffect(() => {
        axios
          .get(`http://localhost:8087/api/user/${userSearchId}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          })
          .then((response) => {
            console.log("response*", response);
            setUser(response.data);
          })
          .catch((error) => {
            console.log("error", error.response.data.statusCode);
            if (error.response.data.statusCode === 401) {
              localStorage.removeItem("accessToken");
            }
          });
      }, []);
      console.log("verification de user-------------", user);

      //-----------mise en place de la fonction qui recupera l'utilisateur co dans la main de facon dynamique

     const handleUserChange = (user: UserProps | null | undefined) => {
       setUser(user);
     };

      const userContextValue = {
        connectedUser: user,
        onUserChange: handleUserChange,
      };
      console.log("voici l'utilisateur connecté..........", connectedUser);

      // Dans le return nous declarons quelle sera la valeur retourné a nos enfants grace a notre provider via la synthaxe suivante
      return (
        <UserContext.Provider value={userContextValue}>
          {children}
        </UserContext.Provider>
      );
    }