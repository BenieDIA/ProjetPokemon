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
    <div className="pv-barre">
      <div className="pv-barre-remplissage" style={barreStyle}></div>
    </div>
  );
};

export default PvBarre;
