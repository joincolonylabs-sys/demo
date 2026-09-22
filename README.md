# Airdrop Demo Page

Page de démonstration pour campagne d'airdrop, basée sur le design fourni.

## Installation locale

```bash
npm install
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000)

## Déploiement sur Vercel

### Option 1 : GitHub + Vercel (recommandé)

1. Pousser ce dépôt sur GitHub
2. Aller sur [vercel.com](https://vercel.com)
3. Cliquer "New Project"
4. Importer le dépôt
5. Vercel détectera Next.js automatiquement
6. Cliquer "Deploy"

### Option 2 : CLI Vercel

```bash
npm i -g vercel
vercel
```

Suivre les instructions et c'est déployé.

## Structure

```
airdrop-demo/
├── pages/
│   ├── _app.jsx
│   ├── _document.jsx
│   └── index.jsx
├── styles/
│   └── globals.css
├── package.json
├── tailwind.config.js
└── vercel.json
```

## Technologies

- **Next.js 14** - React framework
- **Tailwind CSS** - Styling
- **Responsive** - Mobile-friendly

## Notes

- Projet complètement autonome
- Aucune dépendance à d'autres projets
- Production-ready
