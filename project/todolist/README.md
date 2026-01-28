# 📝 TodoList - Gestionnaire de Tâches Moderne

Une application web moderne et élégante pour gérer vos tâches quotidiennes avec un design premium, un mode sombre, et une sauvegarde automatique.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

## ✨ Fonctionnalités

### Fonctionnalités Principales

- ✅ **Ajouter des tâches** - Ajoutez facilement de nouvelles tâches à votre liste
- 📋 **Afficher la liste** - Visualisez toutes vos tâches dans une interface claire
- 🗑️ **Supprimer des tâches** - Supprimez les tâches avec confirmation de sécurité

### Fonctionnalités Bonus

- ✔️ **Marquer comme terminée** - Cliquez sur une tâche pour la marquer comme complétée
- 💾 **Sauvegarde automatique** - Vos tâches sont sauvegardées automatiquement dans le localStorage
- 🔍 **Filtres intelligents** - Filtrez vos tâches (Toutes / À faire / Terminées)
- 🌙 **Mode sombre** - Basculez entre mode clair et sombre avec sauvegarde de préférence
- 📊 **Compteur de tâches** - Visualisez en temps réel le nombre de tâches par catégorie
- ⌨️ **Raccourcis clavier** - Appuyez sur Entrée pour ajouter rapidement une tâche
- 🎨 **Design premium** - Interface moderne avec gradients, animations et effets visuels

## 🛠️ Technologies Utilisées

- **HTML5** - Structure sémantique et accessible
- **CSS3** - Design moderne avec variables CSS, gradients, et animations
- **JavaScript (Vanilla)** - Logique applicative sans framework
- **LocalStorage API** - Persistence des données côté client
- **Google Fonts (Inter)** - Typographie premium

## 🎨 Design & UX

L'application utilise les principes modernes de design :

- Palette de couleurs vibrante avec gradients
- Animations fluides et micro-interactions
- Glassmorphism et ombres élégantes
- Design responsive (mobile-first)
- Interface intuitive et accessible

## 📁 Structure du Projet

```
todolist/
│
├── index.html          # Structure HTML principale
├── style/
│   └── style.css       # Styles CSS avec design system
├── js/
│   └── app.js          # Logique JavaScript
└── README.md           # Documentation (ce fichier)
```

## 🚀 Comment Lancer le Projet

### Prérequis

- Un navigateur web moderne (Chrome, Firefox, Edge, Safari)
- Aucune installation requise !

### Installation

1. **Cloner ou télécharger** le projet :

   ```bash
   git clone [votre-repo-url]
   cd todolist
   ```

2. **Ouvrir le projet** :

   - Double-cliquez sur `index.html`, ou
   - Ouvrez `index.html` dans votre navigateur, ou
   - Utilisez un serveur local (optionnel) :

     ```bash
     # Avec Python 3
     python -m http.server 8000

     # Avec Node.js (http-server)
     npx http-server
     ```

3. **Utiliser l'application** :
   - L'application se charge immédiatement
   - Aucune configuration nécessaire
   - Vos données sont sauvegardées localement automatiquement

## 📖 Guide d'Utilisation

### Ajouter une tâche

1. Tapez votre tâche dans le champ de saisie
2. Cliquez sur "Ajouter" ou appuyez sur **Entrée**
3. La tâche apparaît instantanément dans la liste

### Marquer une tâche comme terminée

- Cliquez sur la tâche ou sur la checkbox
- La tâche devient barrée et grisée
- Cliquez à nouveau pour la marquer comme active

### Supprimer une tâche

1. Cliquez sur le bouton ❌ à droite de la tâche
2. Confirmez la suppression dans la boîte de dialogue
3. La tâche est supprimée définitivement

### Filtrer les tâches

- **Toutes** : Affiche toutes les tâches
- **À faire** : Affiche uniquement les tâches actives
- **Terminées** : Affiche uniquement les tâches complétées

### Activer le mode sombre

- Cliquez sur le bouton ☀️/🌙 en haut à droite
- Le mode sombre s'active avec une transition fluide
- Votre préférence est sauvegardée automatiquement

## 🔒 Données & Confidentialité

- Toutes les données sont stockées **localement** dans votre navigateur
- Aucune donnée n'est envoyée à un serveur externe
- Vos tâches restent privées et confidentielles
- Pour effacer vos données : videz le cache de votre navigateur

## 🧪 Tests Effectués

- ✅ Validation des champs vides
- ✅ Gestion des tâches très longues (100+ caractères)
- ✅ Persistence après rechargement de page
- ✅ Filtres sur différents états de tâches
- ✅ Suppression multiple de tâches
- ✅ Toggle du mode sombre avec persistence
- ✅ Responsive design sur mobile, tablette et desktop
- ✅ Compatibilité cross-browser

## 🎯 Améliorations Futures

Idées pour étendre le projet :

- [ ] Drag & drop pour réorganiser les tâches
- [ ] Catégories / Tags pour organiser les tâches
- [ ] Date d'échéance et rappels
- [ ] Priorités (haute, moyenne, basse)
- [ ] Export / Import des tâches (JSON)
- [ ] Recherche dans les tâches
- [ ] Statistiques et graphiques
- [ ] Mode Pomodoro intégré
- [ ] Synchronisation cloud (Firebase, etc.)

## 👨‍💻 Auteur

**Votre Nom**

- Portfolio : [votre-site.com](https://votre-site.com)
- GitHub : [@votre-username](https://github.com/votre-username)
- LinkedIn : [Votre Nom](https://linkedin.com/in/votre-profil)

## 📄 Licence

Ce projet est sous licence MIT - voir le fichier LICENSE pour plus de détails.

## 🙏 Remerciements

- Inspiration design : Dribbble, Codepen
- Icônes : Emojis natifs
- Polices : Google Fonts (Inter)

---

**💡 Conseil Recruteur** : Ce projet démontre la maîtrise des fondamentaux du développement web (HTML, CSS, JavaScript), la gestion d'état, la persistence des données, et la création d'interfaces utilisateur modernes et intuitives, le tout sans framework !
