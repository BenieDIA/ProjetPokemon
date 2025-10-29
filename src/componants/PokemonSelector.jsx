import React from 'react';
import './PokemonSelector.css'; // Créez ce fichier CSS si besoin

function PokemonSelector({ allPokemons, onSelectPokemon }) {
  // Optionnel: Vous pouvez ajouter des états ici pour suivre la sélection du joueur 1 et du joueur 2

  return (
    <div className="selection-page">
      <h1>Choisissez vos Pokémon pour le combat !</h1>
      <p>Cliquez pour ajouter un Pokémon au combat.</p>
      
      <div className="pokemon-list">
        {allPokemons.map((pokemon) => (
          <div
            key={pokemon.id}
            className="pokemon-card"
            onClick={() => onSelectPokemon(pokemon)}
          >
            <img src={pokemon.photo} alt={pokemon.nom} className="selection-photo" />
            <h2>{pokemon.nom}</h2>
            <p>PV: {pokemon.pvMax}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PokemonSelector;