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

## Tests à implémenter

### Fichier : `e2e/basket.spec.ts`

#### Affichage du panier

| # | Test | Description |
|---|------|-------------|
| 1 | Affichage initial | Le heading "Total", "Sous-total" et les produits (Microphone, Cadre, Voiture) sont visibles |
| 2 | Calcul du sous-total | Le sous-total affiche "80.00 €" |
| 3 | Montant final sans coupon | Le montant final affiche "80.00 €" (= sous-total) |
| 4 | Supprimer un produit | Cliquer sur le bouton remove → il reste 2 produits (`data-testid="basket-item"`) |

### Fichier : `e2e/coupon.spec.ts`

#### Application des codes promo

| # | Test | Description |
|---|------|-------------|
| 5 | Appliquer un coupon | Saisir "DISCOUNTPERCENT10" → cliquer "Ajouter" → "Coupon appliqué" visible |
| 6 | Champ désactivé après application | Après application d'un coupon, le champ input et le bouton sont désactivés |
| 7 | Un seul coupon à la fois | Après application, vérifier qu'un seul coupon est affiché |
| 8 | Supprimer un coupon | Cliquer sur "DISCOUNTPERCENT10 ✕" → "Coupon appliqué" disparaît, champ réactivé |
| 9 | Suggestions de coupon | Taper "BLACK" → la suggestion "BLACKFRIDAY" apparaît |
| 10 | Appliquer depuis suggestions | Taper "DISCOUNT" → cliquer sur suggestion → coupon appliqué |
| 11 | Calcul avec réduction 10% | Appliquer DISCOUNTPERCENT10 → montant final = "72.00 €" (80 - 10%) |
| 12 | Changer de coupon | Appliquer coupon A → supprimer → appliquer coupon B → seul B est affiché |
| 13 | Navigation clavier | Taper "DISCOUNT" → ArrowDown → Enter → coupon appliqué |

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
