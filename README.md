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

## 🛠 Technologies utilisées
- **Frontend** : React (Create React App)
- **Styling** : Tailwind CSS, Framer Motion
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
- [ ] Gestion des liens (ajout, suppression, organisation)
- [ ] Identification automatique des vidéos
- [ ] Système de programmation des alertes
- [ ] Lexique interactif

---

## Licence
Ce projet est sous licence [MIT](LICENSE).

---

## Contact
Pour toute question ou suggestion, n'hésitez pas à ouvrir une [issue](https://github.com/LLafforgue/bibliotheque-front/issues) ou à me contacter directement.
