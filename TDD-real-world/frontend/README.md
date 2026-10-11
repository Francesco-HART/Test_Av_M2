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

Tester l'interface du panier avec **Playwright**.

Fichier : `e2e/basket.spec.ts`

---

## Scénarios à tester

### Affichage du panier
- Les produits sont visibles (nom, prix, quantité)
- Le sous-total est calculé correctement
- Le montant final s'affiche

### Gestion des produits
- Supprimer un produit du panier
- Le total se met à jour après suppression

### Application des codes promo
- Saisir un code promo valide
- Le coupon appliqué s'affiche
- Le montant final est recalculé
- Un seul coupon à la fois (champ désactivé après application)
- Supprimer un coupon appliqué

---

## Exemple de test Playwright

```typescript
import { test, expect } from "@playwright/test";

test.describe("Basket", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should display products", async ({ page }) => {
    await expect(page.getByText("Microphone")).toBeVisible();
  });

  test("should apply coupon", async ({ page }) => {
    await page.getByPlaceholder("Code promo").fill("DISCOUNTPERCENT10");
    await page.getByRole("button", { name: /ajouter/i }).click();

    await expect(page.getByText("Coupon appliqué")).toBeVisible();
  });
});
```

---

## Tips

- Utiliser `data-testid` pour cibler les éléments : `page.locator('[data-testid="basket-item"]')`
- `getByRole`, `getByText`, `getByPlaceholder` pour les sélecteurs accessibles
