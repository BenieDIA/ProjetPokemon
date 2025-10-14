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

const pokemonData = [
  { id: 1, nom: 'Pikachu', pv: 100, pvMax: 100 },
  { id: 2, nom: 'Dracaufeu', pv: 120, pvMax: 120 },
];

function App() {
  const [pokemons, setPokemons] = useState(pokemonData);

  const attaque = { nom: 'Attaque', degats: 20 };

  return (
    <>
      {pokemons.map((pokemon) => (
        <div key={pokemon.id}>
          <Pokemon pokemon={pokemon} />
          <Boutton attaque={attaque} onClick={() => handleAttaque(pokemon)} />
          <PvBarre pv={pokemon.pv} pvMax={pokemon.pvMax} />
        </div>
      ))}
    </>
  )
}

  
  const handleAttaque = () => {
    setPokemons((prevPokemons) =>
      prevPokemons.map((p) => 
        p.id === pokemon.id ? { ...p, pv: p.pv - attaque.degats } : p
      )
    )
  }

export default App
