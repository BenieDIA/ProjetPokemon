import React from 'react';
// composant qui gere le combvat ia entre 1 joueur et une ia et une ia vs ia
import Pokemon from './Pokemon';
import PvBarre from './pvbarre';
import './combatia.css';
function CombatIA({ pokemons, tourActifId, attaquer, passerLeTour, vainqueur }) {

    return (
        <div className="combat-ia">
            <h1>Combat contre l'IA</h1>
            <div className="pokemons-combat">
                {pokemons.map((pokemon) => (
                    <div key={pokemon.id} className={`pokemon-combat ${tourActifId === pokemon.id ? 'tour-actif' : ''}`}>
                        <Pokemon pokemon={pokemon} />
                        <div className="actions">
                            {tourActifId === pokemon.id && !vainqueur && (
                                <>
                                    <button onClick={() => attaquer(pokemon.id, 'ia')}>Attaquer</button>
                                    <button onClick={() => passerLeTour(pokemon.id)}>Passer le tour</button>
                                </>
                            )}
                        </div>
                        {vainqueur && (
                            <div className="vainqueur-badge">
                                {vainqueur === pokemon.id ? 'Vainqueur !' : 'Perdant'}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CombatIA;
