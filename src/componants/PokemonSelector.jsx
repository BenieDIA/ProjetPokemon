import React from 'react';
import './PokemonSelector.css'; 
function PokemonSelector({ allPokemons, onSelectPokemon }) {


  return (
    <div className="selection-page">
      <h1>Choisissez vos Pokémon !</h1>
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
            <p>Énergie: {pokemon.energieMax}</p>
            <p>Attaques:</p>
            <ul>
              {pokemon.attaques.map((attaque, index) => (
                <li key={index}>{attaque.nom} (Coût: {attaque.cout})</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>

  );
}

export default PokemonSelector;