## E-Commerce Basket

### Setup

```bash
npm i
npm run dev
# ou
npm run test

cd frontend
npm i
npm run dev
```

### Commandes de test

```bash
npm test                    # Tests unitaires
npm run test:integration    # Tests d'intégration (Docker requis)
npm run test:e2e            # Tests end-to-end (Docker requis)
npm run test:mutate         # Mutation testing (Stryker)
```

### Objectif

On cherche à calculer le prix d'un panier lors d'une commande en ligne. La commande contient un panier avec des articles, et un ou plusieurs codes promo.
**On veut donc créer la fonction permettant de déterminer le prix final du panier sur lequel est appliqué un ou plusieurs codes promo.**

### Types de codes promo

- **Réduction en pourcentage** : -10% sur la commande
- **Réduction fixe** : 30€ d'offert (min 1€ la commande)
- **Produit offert** : un produit acheté = un produit offert (ex : un PULL acheté = un PULL offert)

- **Black Friday**
  - 50% sur tout le panier
  - Uniquement entre le 2025-11-28 00h00 et le 2025-11-30 23h59
  - Ne peut pas amener le total en dessous de 1 euro
  - Cumulable avec d'autres promotions

### Ordre d'application des réductions

1. D'abord les promos "produit" (ex: 1 acheté = 1 offert)
2. Ensuite les promos fixes/pourcentage
3. Enfin Black Friday

### Conditions d'application

- Un code promo peut s'appliquer uniquement sur certains types de produits (exemple : uniquement sur les TSHIRT)
- Réduction si la commande dépasse x€ (exemple : -10% dès 30€ d'achats)
- Un code promo ne doit jamais faire descendre le total sous 0

### 2. Sauvegarder un panier

Créer `SaveBasketUsecase` qui :
- Calcule le prix total du panier
- Génère un identifiant unique
- Sauvegarde le panier en base de données
- Envoie une notification email de confirmation

### 3. Supprimer un panier

Créer `RemoveBasketUsecase` qui :
- Supprime un panier par son identifiant

### 4. Lister les paniers

Exposer une route GET pour récupérer tous les paniers sauvegardés.

---

## API REST

| Méthode | Route | Description |
|---------|-------|-------------|
| GET | `/baskets` | Liste tous les paniers |
| POST | `/baskets` | Crée et sauvegarde un panier |
| DELETE | `/baskets/:id` | Supprime un panier |

---

### Étapes suggérées

1. **Tests unitaires** : Implémenter les use cases en TDD dans `test/`
   - `calcul-price.usecase.test.ts`
   - `save-basket.usecase.test.ts`
   - `remove-basket.usecase.test.ts`

2. **Tests d'intégration** : Implémenter le repository PostgreSQL (`*.it-spec.ts`)
   - `basket.repository.it-spec.ts`

3. **Tests E2E** : Implémenter les routes API (`*.e2e-spec.ts`)
   - `basket.e2e-spec.ts`

---

### TLDR

- Calculer le montant final du panier après l'application des coupons
- Sauvegarder et supprimer des paniers
- Exposer une API REST
- Utiliser l'API dans le frontend
