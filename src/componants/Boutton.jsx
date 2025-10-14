//Bouton d'attaque pour envoyer une attaque et réduire les PV du pokémon adverse
import React from 'react';
import './Boutton.css';

const Boutton = ({ attaque, onClick }) => {
  return (
    <button className="boutton" onClick={onClick}>
      {attaque.nom}
    </button>
  );
};

export default Boutton;
