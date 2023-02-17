import { AxiosResponse } from 'axios';
import jwtDecode from 'jwt-decode';
import { useEffect, useState, useContext } from 'react';
import { axiosPrivate } from '../../../api/Axios';
import { PayLoadTokenProps } from '../../../interface/Interface';
import './UserProfil.css';

export const UserProfil = () => {
  //--contexte pour déterminer si l'utilisateur est authentifié ou non. Il récupère les propriétés par onAuthChange et savedToken---//

  const [tokenUserId, settokenUserId] = useState<string | null>(null);
  const [userFound, setUserFound] = useState<string[]>([]);

  //-- useEffect prend une fonction de rappel comme premier paramètre, qui est exécutée après chaque rendu du composant.---//

  //--S'il savedToken existe, le code passe à la ligne suivante, qui utilise la jwtDecodefonction pour décoder le jeton.--//

  //--------------------------- pour déterminer si l'utilisateur est authentifié ou non. ------------------------//

  return (
    <div>
      <div className='accordion' id='accordionExample'>
        <div className='accordion-item'>
          <h2 className='accordion-header' id='headingOne'>
            <button
              className='accordion-button'
              type='button'
              data-bs-toggle='collapse'
              data-bs-target='#collapseOne'
              aria-expanded='true'
              aria-controls='collapseOne'
            >
              Accordion Item #1
            </button>
          </h2>
          <div
            id='collapseOne'
            className='accordion-collapse collapse show'
            aria-labelledby='headingOne'
            data-bs-parent='#accordionExample'
          >
            <div className='accordion-body'>
              st about any HTML can go within the <code>.accordion-body</code>,
              though the transition does limit overflow.
            </div>
          </div>
        </div>
        <div className='accordion-item'>
          <h2 className='accordion-header' id='headingTwo'>
            <button
              className='accordion-button collapsed'
              type='button'
              data-bs-toggle='collapse'
              data-bs-target='#collapseTwo'
              aria-expanded='false'
              aria-controls='collapseTwo'
            >
              Accordion Item #2
            </button>
          </h2>
          <div
            id='collapseTwo'
            className='accordion-collapse collapse'
            aria-labelledby='headingTwo'
            data-bs-parent='#accordionExample'
          >
            <div className='accordion-body'>
              about any HTML can go within the <code>.accordion-body</code>,
              though the transition does limit overflow.
            </div>
          </div>
        </div>
        <div className='accordion-item'>
          <h2 className='accordion-header' id='headingThree'>
            <button
              className='accordion-button collapsed'
              type='button'
              data-bs-toggle='collapse'
              data-bs-target='#collapseThree'
              aria-expanded='false'
              aria-controls='collapseThree'
            >
              Accordion Item #3
            </button>
          </h2>
          <div
            id='collapseThree'
            className='accordion-collapse collapse'
            aria-labelledby='headingThree'
            data-bs-parent='#accordionExample'
          >
            <div className='accordion-body'>
              about any HTML can go within the <code>.accordion-body</code>,
              though the transition does limit overflow.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
