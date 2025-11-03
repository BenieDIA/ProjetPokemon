import { useState, useEffect, useRef } from 'react'
import './App.css'
import Pokemon from './componants/Pokemon'
import Boutton from './componants/Boutton'
import PvBarre from './componants/pvbarre'
import './componants/Boutton.css'
import './componants/Pokemon.css'
import './componants/pvbarre.css'
import Image1 from './assets/img/pikachu.png'
import Image2 from './assets/img/dracaufeunormal.png'
import Body from './composants/Body'
import Imgpokemon from './assets/img/profile-pic2.png'
import Image1Attaque from './assets/img/pikaaattque.png' 
import Image2Attaque from './assets/img/Dracaufeuattaque.png' 

const pokemonData = [

  { id: 1, photo: Image1, photoAttaque: Image1Attaque, nom: 'Pikachu', pv: 100, pvMax: 100 },
  { id: 2, photo: Image2, photoAttaque: Image2Attaque, nom: 'Dracaufeu', pv: 100, pvMax: 100 },
];


const genererDegatsAleatoires = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

function App() {

  const audioRef = useRef(null);

  const [pokemons, setPokemons] = useState(pokemonData);
  const [tourActifId, setTourActifId] = useState(pokemonData[0].id);
  const [vainqueur, setVainqueur] = useState(null);
  const [attaquantActifId, setAttaquantActifId] = useState(null);

  const attaques = [
    // Liste des attaques avec des dégâts aléatoires (min et max)
    { nom: '🔥', min: 10, max: 20 },
    { nom: '⚡', min: 20, max: 35 },
    { nom: '👊', min: 30, max: 40 },
  ];
  const soins = [
    { nom: '💖', soin: 15 },
    { nom: '💚', soin: 25 },
  ];
  
  // Utilisation de useEffect pour vérifier la victoire à chaque changement de PV
  useEffect(() => {
    const pokemon1 = pokemons.find(p => p.id === 1);
    const pokemon2 = pokemons.find(p => p.id === 2);
    
    if (pokemon1 && pokemon2) {
        // Détecte si Pikachu est KO et Dracaufeu vivant
        if (pokemon1.pv <= 0 && pokemon2.pv > 0) {
            setVainqueur(pokemon2);
        // Détecte si Dracaufeu est KO et Pikachu vivant
        } else if (pokemon2.pv <= 0 && pokemon1.pv > 0) {
            setVainqueur(pokemon1);
        }
    }
  }, [pokemons]);

  // Démarre la musique après la première interaction utilisateur
  useEffect(() => {
    const playAudio = () => {
      if (audioRef.current) {
        audioRef.current.play();
      }
      window.removeEventListener('click', playAudio);
    };
    window.addEventListener('click', playAudio);
    return () => window.removeEventListener('click', playAudio);
  }, []);

  // Fonction de redémarrage du jeu
  const recommencerLeJeu = () => {
    // Réinitialiser les états à leurs valeurs initiales
    setPokemons(pokemonData.map(p => ({...p}))); // Créer une nouvelle instance des données initiales
    setTourActifId(pokemonData[0].id);
    setVainqueur(null);
    setAttaquantActifId(null);
  }

  const passerLeTour = (ancienTourId) => {
    if (vainqueur) return;
    const prochainPokemon = pokemons.find((p) => p.id !== ancienTourId);
    if (prochainPokemon) {
        setTourActifId(prochainPokemon.id);
    }
  };

  const attaquer = (attaquantId, defenseurId, minDegats, maxDegats) => {
    // Si un vainqueur est déjà déclaré ou l'attaquant KO, on ne fait rien
    if (vainqueur || pokemons.find(p => p.id === attaquantId)?.pv <= 0) return;
    
    // verification du tour
    if (attaquantId !== tourActifId) {
        alert("Ce n'est pas le tour de " + pokemons.find(p => p.id === attaquantId).nom + " !");
        return; 
    }
    
  
    setAttaquantActifId(attaquantId);
    const degats = genererDegatsAleatoires(minDegats, maxDegats);
 
    setPokemons((prevPokemons) =>
      prevPokemons.map((pokemon) => {
        if (pokemon.id === defenseurId) {
          // Limite les PV à 0
          return { ...pokemon, pv: Math.max(pokemon.pv - degats, 0) };
        }
        return pokemon;
      })
    );
    
    setTimeout(() => {
        setAttaquantActifId(null);
        passerLeTour(attaquantId);
    }, 1500); 
  };

  //fonction de soin
  const soigner = (pokemonId, soin) => {
    if (vainqueur || pokemons.find(p => p.id === pokemonId)?.pv <= 0) return;
    if (pokemonId !== tourActifId) {
        alert("Ce n'est pas le tour de " + pokemons.find(p => p.id === pokemonId).nom + " !");
        return; 
    }

    setPokemons((prevPokemons) =>
      prevPokemons.map((pokemon) => {
        if (pokemon.id === pokemonId) {
          // Limite les PV au maximum (pvMax)
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
    <audio ref={audioRef} src="/music.mp3" autoPlay loop />
    <div className="app">
      <img src={Imgpokemon} alt="Profil Pokémon" className="profile-img" />
      
      {/* Affichage conditionnel du vainqueur  */}
      {vainqueur ? (
          <div className="vainqueur-message">
              <h2 className="tour-info" style={{ color: 'green', fontSize: '1.5em' }}>
                  🎉 {vainqueur.nom} a gagné le combat ! 🎉
              </h2>
              {/* Bouton Rejouer  */}
              <Boutton
                attaque={{ nom: 'REJOUER', degats: 'GO !' }}
                onClick={recommencerLeJeu}
                disabled={false} 
              />
          </div>
      ) : (
          <h2 className="tour-info">
              C'est au tour de : 
              <span style={{ color: tourActifId === 1 ? 'blue' : 'red' }}>
                  {pokemons.find(p => p.id === tourActifId)?.nom}
              </span>
          </h2>
      )}
      
      <div className="combat">
  
        {pokemons.map((pokemon) => {
          const estTourActif = pokemon.id === tourActifId && !vainqueur;
          const estKO = pokemon.pv <= 0;
          const imageAffichee = (pokemon.id === attaquantActifId) 
                              ? pokemon.photoAttaque
                              : pokemon.photo;
          
          return (
            <div 
                key={pokemon.id} 
                className={`pokemon-container ${!estTourActif && !vainqueur ? 'inactif' : ''} ${estKO ? 'ko' : ''}`}
            >

              <img 
                key={imageAffichee}
                src={imageAffichee} 
                alt={pokemon.nom} 
                className="pokemon-photo"
              />
              <Pokemon pokemon={pokemon} />
              
              <div className="attaques">
                {attaques.map((attaque, index) => (
                  <Boutton
                    key={index}
                    // Affichage de l'intervalle de dégâts sur le bouton
                    attaque={{ nom: attaque.nom, degats: `${attaque.min}-${attaque.max} DMG` }}
                    onClick={() => attaquer(
                        pokemon.id, 
                        pokemons.find((p) => p.id !== pokemon.id).id, 
                        attaque.min, 
                        attaque.max
                    )}
                    // Désactivé si inactif, si jeu terminé, si KO, ou si un attaquant est déjà actif (pour l'animation)
                    disabled={!estTourActif || vainqueur || estKO || attaquantActifId} 
                  />
                ))}
              </div>
              <div className="soins">
                {soins.map((soin, index) => (
                  <Boutton
                    key={index}
                    attaque={soin}
                    onClick={() => soigner(pokemon.id, soin.soin)}
                    disabled={!estTourActif || vainqueur || estKO || attaquantActifId}
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