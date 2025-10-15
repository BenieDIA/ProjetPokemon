# 🚀 Pokémon Battle - Simulateur de Combat au Tour par Tour

Ce projet est une application web simple développée avec **React** qui simule un combat Pokémon classique au tour par tour entre deux créatures. Le but est d'apprendre et de pratiquer les concepts fondamentaux de React, tels que la gestion des états (`useState`), les effets de cycle de vie (`useEffect`), et le passage de fonctions (callbacks) entre composants.

---

## ✨ Fonctionnalités

Le simulateur de combat inclut les fonctionnalités suivantes :

* **Combat 1 contre 1** : Gestion du tour de chaque Pokémon.
* **Attaques à Dégâts Aléatoires** : Chaque attaque inflige des dégâts compris dans un intervalle spécifique, ajoutant un facteur de chance au combat.
* **Actions de Soin** : Possibilité de soigner ses propres PV (Points de Vie).
* **Animation Visuelle** : L'image du Pokémon change brièvement lorsqu'il utilise une attaque (grâce à l'état `attaquantActifId` et `setTimeout`).
* **Détection de Victoire** : Un message de victoire apparaît automatiquement dès que les PV d'un Pokémon tombent à 0.
* **Bouton Recommencer** : Permet de réinitialiser l'état du jeu pour lancer un nouveau combat.

---

## 🛠️ Technologies Utilisées

* **React** : Bibliothèque JavaScript pour la construction de l'interface utilisateur.
* **JavaScript (ES6+)** : Pour la logique de jeu, la gestion des états et les fonctions d'attaque/soin.
* **CSS** : Pour la mise en page et le style (fichiers `.css` séparés par composant).

---

## 📂 Structure du Projet

Les fichiers clés du projet sont :

| Fichier/Dossier | Rôle |
| :--- | :--- |
| `src/App.jsx` | Le composant principal, gérant la **logique de combat**, les **états** (`pokemons`, `tourActifId`, `vainqueur`), et les fonctions (`attaquer`, `soigner`, `recommencerLeJeu`). |
| `src/componants/Pokemon.jsx` | Affiche les informations de base d'un Pokémon (nom, PV). |
| `src/componants/Boutton.jsx` | Composant réutilisable pour les actions (Attaque, Soin, Rejouer). |
| `src/componants/pvbarre.jsx` | Affiche la barre de vie visuelle d'un Pokémon. |
| `src/assets/img/` | Contient les images des Pokémon et de leurs animations d'attaque. |

---


fait par Arstide Samba et Benie Dianingana