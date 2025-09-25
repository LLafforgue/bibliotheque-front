# Bibliothèque Front

**Un outil interactif pour organiser, annoter et apprendre à partir de vos liens favoris.**

---

## Description
Ce projet permet aux utilisateurs connectés de :
- **Stocker et organiser** des liens de manière plus interactive que les favoris classiques.
- **Identifier automatiquement** les vidéos et autres médias.
- **Programmer des alertes** pour suivre les mises à jour ou les rappels.
- **Enrichir un lexique personnel** et apprendre à partir des contenus sauvegardés.

---

## État du projet

### **En développement actif**
- **Authentification utilisateur** (UX finalisée)
  - Inscription (`/register`)
  - Connexion (`/login`)
  - Réinitialisation du mot de passe (`/NvPassword`)

- **Fonctionnalités principales**
  En cours d'implémentation :
  - Gestion des liens
  - Identification des vidéos
  - Système d'alertes
  - Lexique interactif
---

## 📦 **Dépendances clés**


| Catégorie       | Librairie                  |version    | Usage                            |
|-----------------|----------------------------|-----------|----------------------------------|
| **UI**          | `tailwindcss`              | ^3.4.17   | Styling utilitaire               |
|                 | `framer-motion`            | ^12.23.12 | Animations                       |
|                 | `@radix-ui/react-tooltip`  | ^1.2.8    | Info-bulles accessibles          |
| **Icons**       | `fontAwesomeIcon`          | ^7.0.1    | Icones stylisées                 |
| **Médias**      | `react-player`             | à venir   |Lecture de vidéos embarquées      |
| **Utils**       | `date-fns`                 | à venir   | Manipulation des dates (alertes) |
| **Routing**     | `react-router-dom`         | ^7.8.2    | Gestion des routes               |

- **Gestion de projet** : Git, GitHub

---

## Structure du projet
```
bibliotheque-front/
├── public/          # Fichiers statiques
├── src/             # Code source principal
├── .gitignore       # Fichiers ignorés par Git
├── package.json     # Dépendances et scripts
├── tailwind.config.js # Configuration Tailwind
└── README.md        # Ce fichier
```

---

## Installation et lancement

### Prérequis
- Node.js (version 16 ou supérieure)
- npm ou yarn

### Étapes
1. Cloner le dépôt :
   ```bash
   git clone https://github.com/LLafforgue/bibliotheque-front.git
   ```
2. Installer les dépendances :
   ```bash
   cd bibliotheque-front
   npm install
   ```
3. Lancer l'application en mode développement :
   ```bash
   npm start
   ```
   L'application sera disponible à l'adresse [http://localhost:3000](http://localhost:3000).

---

## Fonctionnalités prévues
- [x] Authentification utilisateur
- [x] Gestion des liens (ajout, suppression, organisation)
- [x] Identification automatique des vidéos
- [x] Gestion et affichage des favoris
- [ ] Système de programmation des alertes
- [ ] Lexique interactif

---

## Licence
Ce projet est sous licence [MIT](LICENSE).

---

## Contact
Pour toute question ou suggestion, n'hésitez pas à ouvrir une [issue](https://github.com/LLafforgue/bibliotheque-front/issues) ou à me contacter directement.


