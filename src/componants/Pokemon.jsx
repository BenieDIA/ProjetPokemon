// Composant pour afficher les informations d'un Pokémon
import React from 'react';
import PvBarre from './pvbarre';
import './Pokemon.css';
const Pokemon = ({ pokemon }) => {
  return (
    <div className="pokemon">
      <h2>{pokemon.nom}</h2>
      <PvBarre pv={pokemon.pv} pvMax={pokemon.pvMax} />
    </div>
  );
};

export default Pokemon;
