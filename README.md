# Autoclave Métrologie Web

Application web de confirmation métrologique pour autoclaves. Système de validation et de surveillance des cycles de stérilisation avec visualisation de données en temps réel.

## 🎯 Fonctionnalités

- **Dashboard en Direct**: Surveillance en temps réel des paramètres de stérilisation
- **Suivi de Cycles**: Visualisation complète des phases de cycle (vide, chauffage, stérilisation, séchage, refroidissement)
- **Jauges de Mesure**: Affichage de la température et de la pression avec indicateurs de conformité
- **Rapports de Validation**: Historique complet des tests de validation
- **Visualisation de Données**: Graphiques interactifs des profils température/pression
- **Design Scientifique**: Interface utilisant le paradigme Scientific Brutalism pour une lisibilité maximale

## 🎨 Design

L'application utilise le design **Scientific Brutalism** avec:
- **Palette de couleurs**: Clinical White, Deep Slate, Safety Orange, Data Blue
- **Typographie**: JetBrains Mono (données), Space Grotesk (titres), Public Sans (corps)
- **Grilles techniques**: Visuels inspirés des cahiers de laboratoire
- **Haute lisibilité**: Contraste élevé pour environnements professionnels

## 🚀 Développement

### Prérequis
- Node.js 20+
- npm ou pnpm

### Installation

```bash
# Installer les dépendances
npm install

# Lancer en mode développement
npm run dev

# Construire pour production
npm run build
```

Le serveur de développement démarre sur `http://localhost:3000`

### Structure du Projet

```
client/
  src/
    components/       # Composants réutilisables
    pages/           # Pages de l'application
    types/           # Définitions TypeScript
    lib/             # Utilitaires et données mock
    index.css        # Styles globaux
server/              # Serveur Express (production)
shared/              # Code partagé client/serveur
```

## 📦 Déploiement

Voir [DEPLOYMENT.md](./DEPLOYMENT.md) pour les instructions détaillées de déploiement sur Netlify.

**Déploiement rapide:**
```bash
npm install && npm run build
npx netlify-cli deploy --prod
```

## 🛠 Technologies

- **Frontend**: React 19, TypeScript, TailwindCSS 4
- **UI Components**: Shadcn/ui (Radix UI)
- **Charts**: Recharts
- **Routing**: Wouter
- **Build**: Vite
- **Deployment**: Netlify-ready

## 📊 Données

Cette version utilise des **données de démonstration** (mock data) pour illustrer les fonctionnalités. Pour une utilisation en production, vous devrez:

1. Implémenter une API backend
2. Connecter à une base de données
3. Intégrer avec les systèmes d'acquisition de données réels
4. Ajouter l'authentification utilisateur

## 📝 Conformité

Le système est conçu selon les standards de l'industrie:
- Norme ISO 17665 pour la stérilisation
- Validation selon les bonnes pratiques pharmaceutiques
- Traçabilité complète des cycles

## 🤝 Contribution

Ce projet est un prototype/mockup. Pour toute question ou amélioration:
1. Créez une issue
2. Proposez une pull request
3. Contactez l'équipe de développement

## 📄 Licence

MIT

---

**Note**: Ceci est une application de démonstration. Ne pas utiliser en production sans adapter les fonctionnalités aux besoins réels et ajouter les systèmes backend appropriés.
