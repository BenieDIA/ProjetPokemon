import { useState } from 'react'
import './App.css'
import Pokemon from './componants/Pokemon'
import Boutton from './componants/Boutton'
import PvBarre from './componants/pvbarre'
import './componants/Boutton.css'
import './componants/Pokemon.css'
import './componants/pvbarre.css'
import Image1 from './assets/img/pikachu.png'
import Image2 from './assets/img/dracaufeu.png'
import Body from './composants/Body'

const pokemonData = [
  { id: 1, photo: Image1, nom: 'Pikachu', pv: 70, pvMax: 100 },
  { id: 2, photo: Image2, nom: 'Dracaufeu', pv: 90, pvMax: 120 },
];

function App() {

  // État des Pokémon
  const [pokemons, setPokemons] = useState(pokemonData);
  const [tourActifId, setTourActifId] = useState(pokemonData[0].id); 

  const attaques = [
    { nom: '🔥', degats: 10 },
    { nom: '⚡', degats: 20 },
    { nom: '👊', degats: 30 },
  ];
  const soins = [
    { nom: '💖', soin: 10 },
    { nom: '💚', soin: 15 },
  ];
  

  const passerLeTour = (ancienTourId) => {
    // Trouve l'ID du Pokémon qui n'était PAS l'ancien actif
    const prochainPokemon = pokemons.find((p) => p.id !== ancienTourId);
    if (prochainPokemon) {
        setTourActifId(prochainPokemon.id);
    }
  };

  const attaquer = (attaquantId, defenseurId, degats) => {
    // verification du tour
    if (attaquantId !== tourActifId) {
        alert("Ce n'est pas le tour de " + pokemons.find(p => p.id === attaquantId).nom + " !");
        return; 
    }

    // attaque
    setPokemons((prevPokemons) =>
      prevPokemons.map((pokemon) => {
        if (pokemon.id === defenseurId) {
          return { ...pokemon, pv: Math.max(pokemon.pv - degats, 0) };
        }
        return pokemon;
      })
    );
    
    // PASSAGE DU TOUR
    passerLeTour(attaquantId);
  };
//fonction de soin
  const soigner = (pokemonId, soin) => {
    // verification du tour
    if (pokemonId !== tourActifId) {
        alert("Ce n'est pas le tour de " + pokemons.find(p => p.id === pokemonId).nom + " !");
        return; 
    }

    setPokemons((prevPokemons) =>
      prevPokemons.map((pokemon) => {
        if (pokemon.id === pokemonId) {
          const nouveauxPv = Math.min(pokemon.pv + soin, pokemon.pvMax);
          return { ...pokemon, pv: nouveauxPv };
        }
        return pokemon;
      })
    );
    passerLeTour(pokemonId);
  };
  
  return (
    <>
    <Body />
    <div className="app">
      <h1>Combat de Pokémons</h1>
      <h2 className="tour-info">
          C'est au tour de : 
          <span style={{ color: tourActifId === 1 ? 'blue' : 'red' }}>
              {pokemons.find(p => p.id === tourActifId)?.nom}
          </span>
      </h2>
      
      <div className="combat">
        {pokemons.map((pokemon) => {
          const estTourActif = pokemon.id === tourActifId;
          
          return (
            <div key={pokemon.id} className={`pokemon-container ${!estTourActif ? 'inactif' : ''}`}>
              <img src={pokemon.photo} alt={pokemon.nom} className="pokemon-photo" />
              <Pokemon pokemon={pokemon} />
              <div className="attaques">
             
                {attaques.map((attaque, index) => (
                  <Boutton
                    key={index}
                    attaque={attaque}
                    onClick={() => attaquer(pokemon.id, pokemons.find((p) => p.id !== pokemon.id).id, attaque.degats)}
                    disabled={!estTourActif} 
                  />
                ))}
              </div>
              <div className="soins">
                {soins.map((soin, index) => (
                  <Boutton
                    key={index}
                    attaque={soin}
                    onClick={() => soigner(pokemon.id, soin.soin)}
                    disabled={!estTourActif}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
</>
  );
}


export default App;