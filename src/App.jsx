import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
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
  { id: 1, photo: Image1, nom: 'Pikachu', pv: 100, pvMax: 100 },
  { id: 2, photo: Image2, nom: 'Dracaufeu', pv: 120, pvMax: 120 },
];

function App() {

  //Affichage du combat entre deux pokémons avec la barre de vie et le bouton d'attaque et photo


  const [pokemons, setPokemons] = useState(pokemonData);

  const attaques = [
    { nom: 'Attaque 1', degats: 10 },
    { nom: 'Attaque 2', degats: 20 },
    { nom: 'Attaque 3', degats: 30 },
  ];  
  const attaquer = (attaquantId, defenseurId, degats) => {
    setPokemons((prevPokemons) =>
      prevPokemons.map((pokemon) => {
        if (pokemon.id === defenseurId) {
          return { ...pokemon, pv: Math.max(pokemon.pv - degats, 0) };
        }
        return pokemon;
      })
    );
  };
  return (
    <>
    <Body />
    <div className="app">
      <h1>Combat de Pokémons</h1>
      <div className="combat">
        {pokemons.map((pokemon) => (
          <div key={pokemon.id} className="pokemon-container">
            <img src={pokemon.photo} alt={pokemon.nom} className="pokemon-photo" />
            <Pokemon pokemon={pokemon} />
            <div className="attaques">
              {attaques.map((attaque, index) => (
                <Boutton
                  key={index}
                  attaque={attaque}
                  onClick={() => attaquer(pokemon.id, pokemons.find((p) => p.id !== pokemon.id).id, attaque.degats)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
</>
  );
}


export default App;
