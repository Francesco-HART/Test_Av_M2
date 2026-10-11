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

## Tests d'intégration (Repository)

Tester le repository avec une **vraie base PostgreSQL** via Testcontainers/Docker.

Fichier : `api/infra/test/basket.repository.it-spec.ts`

### Tests à implémenter

| # | Test | Description |
|---|------|-------------|
| 1 | Sauvegarder un panier | Appeler `save(basket)` → vérifier que le panier ET ses produits sont en BDD |
| 2 | Supprimer un panier | Insérer 2 paniers → appeler `remove(id1)` → vérifier que seul le panier 2 reste |

### Structure du test

```typescript
import { startDockerPostgresql, stopDockerPostgresql, resetDB }
  from "setup-integration-tests/docker-postgresql-manager";
import knexConfig from "setup-integration-tests/knexfile";

describe("Knex basket repository", () => {
  let sqlConnection: Knex;
  let knexBasketRepo: KnexBasketRepository;

  beforeAll(async () => {
    await startDockerPostgresql();  // 🐳 Lance PostgreSQL
    sqlConnection = knex(knexConfig.test);
  });

  afterAll(async () => {
    await stopDockerPostgresql();   // 🛑 Arrête le container
  });

  beforeEach(async () => {
    await resetDB(sqlConnection);   // 🧹 Vide les tables entre chaque test
    knexBasketRepo = new KnexBasketRepository(sqlConnection);
  });

  it("can save a basket", async () => {
    const basket = { id: "...", products: [...], totalPrice: 100 };

    await knexBasketRepo.save(basket);

    // Vérifier directement en BDD
    const baskets = await sqlConnection("baskets").select("*");
    expect(baskets).toHaveLength(1);
  });
});
```

### Tables à vérifier

- `baskets` : `id` (UUID), `totalPrice` (integer)
- `products` : `basketId` (FK), `name`, `quantity`, `price`

---

## Tests E2E API (Backend)

Utiliser **Supertest** pour tester les routes HTTP.

Fichier : `api/tests/basket.e2e-spec.ts`

### Tests à implémenter

#### GET /baskets

| # | Test | Description | Status |
|---|------|-------------|--------|
| 1 | Retourne tous les paniers | Après création d'un panier, GET retourne la liste avec ce panier | 200 |

#### POST /baskets

| # | Test | Description | Status |
|---|------|-------------|--------|
| 2 | Créer un panier simple | 1 produit (qty: 1, price: 20), vérifie `totalPrice: 20` et `id` généré | 201 |
| 3 | Créer un panier multi-produits | T-Shirt (qty: 2, price: 15) + Pull (qty: 1, price: 25) = `totalPrice: 55` | 201 |
| 4 | Créer un panier avec code promo | Avec `reductionCode`, vérifie que `totalPrice` est calculé | 201 |
| 5 | Panier vide | Envoyer `products: []` retourne erreur "Products is required" | 400/500 |

#### DELETE /baskets/:id

| # | Test | Description | Status |
|---|------|-------------|--------|
| 6 | Supprimer un panier | Créer → Supprimer → GET retourne liste vide | 204 |
| 7 | Supprimer le bon panier | Créer 2 paniers → Supprimer le 1er → GET retourne uniquement le 2ème | 204 |

### Exemple de code

```typescript
import request from "supertest";
import app from "../controllers/routes";
import { ProductsType } from "../../app/reduction.gateway";

describe("POST /baskets", () => {
  it("should create a basket successfully", async () => {
    const basketData = {
      products: [
        { name: "T-Shirt", quantity: 2, type: ProductsType.TSHIRT, price: 15 }
      ],
      reductionCode: ""
    };

    const response = await request(app)
      .post("/baskets")
      .send(basketData)
      .expect(201);

    expect(response.body.totalPrice).toBe(30);
    expect(response.body.id).toBeDefined();
  });
});
```

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
