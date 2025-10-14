// Composant pour afficher la barre de PV d'un Pokémon
import React from 'react';
import './pvbarre.css';

const PvBarre = ({ pv, pvMax }) => {
  const pourcentagePv = (pv / pvMax) * 100;
    const barreStyle = {
      width: `${pourcentagePv}%`,
      backgroundColor: pourcentagePv > 50 ? 'green' : pourcentagePv > 20 ? 'orange' : 'red',
    };
  return (
   // Affichage de la barre de PV avec un style dynamique
    <div className="pv-barre">
      <div className="pv-barre-fill" style={barreStyle}></div>
      <span className="pv-text">{`${pv} / ${pvMax} PV`}</span>
    </div>
  );
};

export default PvBarre;
