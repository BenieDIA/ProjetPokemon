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
import ImageMewtwo from './assets/img/mewtwo.png'
import ImageMewtwoAttaque from './assets/img/mewtwoattaque.png'
import Imagelucario from './assets/img/lucario.png'
import ImagelucarioAttaque from './assets/img/lucarioattaque.png'
import ImageAmphinobi from './assets/img/amphinobinormal.png'
import ImageAmphinobiAttaque from './assets/img/amphinobiatk.png'
import ImageReshiram from './assets/img/reshiram.png'
import ImageReshiramAttaque from './assets/img/reshiramatk.png'


// Liste complète des Pokémon disponibles
const ALL_POKEMON_DATA = [
  { id: 1, photo: Image1, photoAttaque: Image1Attaque, nom: 'Pikachu', pv: 100, pvMax: 100, energie: 100, energieMax: 100, couleur: 'blue' },
  { id: 2, photo: Image2, photoAttaque: Image2Attaque, nom: 'Dracaufeu', pv: 100, pvMax: 100, energie: 100, energieMax: 100, couleur: 'red' },
  { id: 3, photo: ImageMewtwo, photoAttaque: ImageMewtwoAttaque, nom: 'Mewtwo', pv: 100, pvMax: 100, energie: 100, energieMax: 100, couleur: 'purple' },
  { id: 4, photo: Imagelucario, photoAttaque: ImagelucarioAttaque, nom: 'Lucario', pv: 100, pvMax: 100, energie: 100, energieMax: 100, couleur: 'blue' },
  { id: 5, photo: ImageAmphinobi, photoAttaque: ImageAmphinobiAttaque, nom: 'Amphinobi', pv: 100, pvMax: 100, energie: 100, energieMax: 100, couleur: 'blue' },
  { id: 6, photo: ImageReshiram, photoAttaque: ImageReshiramAttaque, nom: 'Reshiram', pv: 100, pvMax: 100, energie: 100, energieMax: 100, couleur: 'white' },


];

const genererDegatsAleatoires = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

function App() {

  const audioRef = useRef(null);

  const [view, setView] = useState('selection');
  const [selectedPokemons, setSelectedPokemons] = useState([]);
  const [pokemons, setPokemons] = useState([]);
  const [tourActifId, setTourActifId] = useState(null);
  const [vainqueur, setVainqueur] = useState(null);
  const [attaquantActifId, setAttaquantActifId] = useState(null);

  const attaques = [
    { nom:  '👊', min: 10, max: 15, cout: 0 },
    { nom: '⚡', min: 20, max: 35, cout: 30 },
    { nom: '🔥', min: 30, max: 40, cout: 40 },
  ];
  const soins = [
    { nom: '💖', soin: 15, cout: 5},
    { nom: '💚', soin: 25, cout: 10 },
  ];

  
  const handleSelect = (pokemonChoisi) => {
    if (selectedPokemons.length >= 2) {
      alert("La sélection est complète ! Cliquez sur 'COMMENCER LE COMBAT'.");
      return;
    }
    if (selectedPokemons.some(p => p.id === pokemonChoisi.id)) {
      alert(pokemonChoisi.nom + " est déjà sélectionné.");
      return;
    }
    setSelectedPokemons((prev) => [...prev, {...pokemonChoisi}]);
  };

  const handleStartCombat = () => {
    if (selectedPokemons.length < 2) {
      alert("Veuillez sélectionner deux Pokémon avant de commencer le combat.");
      return;
    }
    setPokemons(selectedPokemons.map(p => ({...p})));
    setTourActifId(selectedPokemons[0].id);
    setVainqueur(null);
    setView('combat');
  };

  // --- VÉRIFICATION DE VICTOIRE ---
  useEffect(() => {
    if (view !== 'combat' || pokemons.length !== 2) return;
    const [p1, p2] = pokemons;
    if (p1.pv <= 0 && p2.pv > 0) setVainqueur(p2);
    else if (p2.pv <= 0 && p1.pv > 0) setVainqueur(p1);
  }, [pokemons, view]);

  // --- MUSIQUE ---
  useEffect(() => {
    const playAudio = () => {
      const audio = audioRef.current;
      if (audio && audio.paused) {
        audio.volume = 0.8;
        audio.play().catch(e => console.error("La lecture audio a échoué:", e));
      }
    };
    window.addEventListener('click', playAudio, { once: true });
    return () => window.removeEventListener('click', playAudio);
  }, []);


  const recommencerLeJeu = () => {
    setSelectedPokemons([]);
    setPokemons([]);
    setTourActifId(null);
    setVainqueur(null);
    setAttaquantActifId(null);
    setView('selection');
  }

  // --- PASSAGE DE TOUR + REGEN ENERGIE ---
  const passerLeTour = (ancienTourId) => {
    if (vainqueur) return;
    const prochainPokemon = pokemons.find((p) => p.id !== ancienTourId);
    if (prochainPokemon) {
      setTourActifId(prochainPokemon.id);
      setPokemons(prev =>
        prev.map(p =>
          p.id === prochainPokemon.id
            ? { ...p, energie: Math.min(p.energie + 10, p.energieMax) }
            : p
        )
      );
    }
  };

  // --- ATTAQUER ---
  const attaquer = (attaquantId, defenseurId, minDegats, maxDegats, cout) => {
    if (vainqueur) return;
    const attaquant = pokemons.find(p => p.id === attaquantId);
    if (!attaquant || attaquant.pv <= 0) return;
    if (attaquantId !== tourActifId) {
      alert("Ce n'est pas le tour de " + attaquant.nom + " !");
      return;
    }
    if (attaquant.energie < cout) {
      alert(`${attaquant.nom} n'a pas assez d'énergie !`);
      return;
    }

    setAttaquantActifId(attaquantId);
    const degats = genererDegatsAleatoires(minDegats, maxDegats);

    setPokemons(prev =>
      prev.map(p => {
        if (p.id === defenseurId)
          return { ...p, pv: Math.max(p.pv - degats, 0) };
        if (p.id === attaquantId)
          return { ...p, energie: Math.max(p.energie - cout, 0) };
        return p;
      })
    );

    setTimeout(() => {
      setAttaquantActifId(null);
      passerLeTour(attaquantId);
    }, 500);
  };

  // --- SOIGNER ---
  const soigner = (pokemonId, soin, cout) => {
    const pokemon = pokemons.find(p => p.id === pokemonId);
    if (!pokemon || pokemon.pv <= 0 || vainqueur) return;
    if (pokemonId !== tourActifId) {
      alert("Ce n'est pas le tour de " + pokemon.nom + " !");
      return;
    }
    if (pokemon.energie < cout) {
      alert(`${pokemon.nom} n'a pas assez d'énergie pour se soigner !`);
      return;
    }

    setPokemons(prev =>
      prev.map(p => {
        if (p.id === pokemonId) {
          const nouveauxPv = Math.min(p.pv + soin, p.pvMax);
          const nouvelleEnergie = Math.max(p.energie - cout, 0);
          return { ...p, pv: nouveauxPv, energie: nouvelleEnergie };
        }
        return p;
      })
    );

    passerLeTour(pokemonId);
  };

  // --- RENDU SELECTION ---
  if (view === 'selection') {
    return (
      <>
        <Body />
        <div className="app selection-view">
          <h1 style={{ marginBottom: '20px' }}>Choisissez vos deux Pokémon ! ⚔️</h1>
          <div className="pokemon-list" style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
            {ALL_POKEMON_DATA.map((pokemon) => (
              <div
                key={pokemon.id}
                className={`pokemon-card ${selectedPokemons.some(p => p.id === pokemon.id) ? 'selected' : ''}`}
                onClick={() => handleSelect(pokemon)}
                style={{ 
                  border: selectedPokemons.some(p => p.id === pokemon.id) ? `3px solid ${pokemon.couleur}` : '1px solid #ccc',
                  padding: '15px',
                  cursor: 'pointer',
                  textAlign: 'center',
                  borderRadius: '10px'
                }}
              >
                <img src={pokemon.photo} alt={pokemon.nom} style={{ width: '100px', height: 'auto' }} />
                <h3>{pokemon.nom}</h3>
                <p>PV: {pokemon.pvMax}</p>
                <p>Énergie: {pokemon.energieMax}</p>
              </div>
            ))}
          </div>
          <h2 style={{ marginTop: '30px' }}>
            Sélectionnés ({selectedPokemons.length}/2) : 
            {selectedPokemons.map(p => p.nom).join(' vs ')}
          </h2>
          <Boutton
            attaque={{ nom: 'COMMENCER LE COMBAT', degats: selectedPokemons.length === 2 ? 'GO !' : '...' }}
            onClick={handleStartCombat}
            disabled={selectedPokemons.length < 2} 
          />
        </div>
      </>
    );
  }

  // RENDU COMBAT
  return (
    <>
      <Body />
      <audio ref={audioRef} src="/music.mp3" loop />
      <div className="app">
        <img src={Imgpokemon} alt="Profil Pokémon" className="profile-img" />
       {vainqueur ? (
  <div className="vainqueur-message" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
    <h2 className="tour-info" style={{ color: 'green', fontSize: '1.5em' }}>
      🎉 {vainqueur.nom} a gagné le combat ! 🎉
    </h2>

    {/* 🔁 Bouton rejouer avec les mêmes Pokémon */}
    <Boutton
      attaque={{ nom: ' REJOUER', degats: 'Encore un combat !' }}
      onClick={() => {
        setPokemons(selectedPokemons.map(p => ({
          ...p,
          pv: p.pvMax,
          energie: p.energieMax
        })));
        setVainqueur(null);
        setTourActifId(selectedPokemons[0].id);
        setAttaquantActifId(null);
      }}
      disabled={false}
    />

    {/* 🔙 Bouton retour à la sélection */}
    <Boutton
      attaque={{ nom: ' RETOUR SÉLECTION', degats: 'Changer de Pokémon' }}
      onClick={recommencerLeJeu}
      disabled={false}
    />
  </div>
) : (

          <h2 className="tour-info">
            C'est au tour de : 
            <span style={{ color: pokemons.find(p => p.id === tourActifId)?.couleur || 'black' }}>
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
                <img src={imageAffichee} alt={pokemon.nom} className="pokemon-photo" />
                <Pokemon pokemon={pokemon} />
                <p>⚡ Énergie : {pokemon.energie}/{pokemon.energieMax}</p>

                <div className="attaques">
                  {attaques.map((attaque, index) => (
                    <Boutton
                      key={index}
                      attaque={{ nom: attaque.nom, degats: `${attaque.min}-${attaque.max} DMG (${attaque.cout}⚡)` }}
                      onClick={() =>
                        attaquer(
                          pokemon.id, 
                          pokemons.find((p) => p.id !== pokemon.id).id, 
                          attaque.min, 
                          attaque.max,
                          attaque.cout
                        )
                      }
                      disabled={!estTourActif || vainqueur || estKO || attaquantActifId}
                    />
                  ))}
                </div>

                <div className="soins">
                  {soins.map((soin, index) => (
                    <Boutton
                      key={index}
                      attaque={{ nom: soin.nom, degats: `+${soin.soin} PV (${soin.cout}⚡)` }}
                      onClick={() => soigner(pokemon.id, soin.soin, soin.cout)}
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
