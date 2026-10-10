# Frontend E-Commerce

## Structure

- `components/basket/` : Composants du panier à tester
- `data/` : Données de demo et types
- `e2e/` : Tests end-to-end Playwright (à créer)

## Stack

- React + Vite + TypeScript
- UI: Shadcn/ui
- Tests: Playwright

## Commandes

```bash
npm i
npm run dev           # Lancer le serveur de dev
npm run test:e2e      # Lancer les tests Playwright
npm run test:e2e:ui   # Lancer avec interface graphique
```

## Objectif

Tester l'interface du panier :

- Affichage des produits
- Application des codes promo
- Calcul du montant final
