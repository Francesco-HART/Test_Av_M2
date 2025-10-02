import { useState, useEffect, useCallback } from "react";
import { productsStub, Product } from "../../data/products.ts";
import BasketList from "@/components/basket/BasketList.tsx";
import BasketTotal from "@/components/basket/BasketTotal.tsx";
import AddProductButton from "@/components/basket/AddProductButton.tsx";
import { basketApi } from "@/services/api.ts";

export default function Basket() {
  const [basketProducts, setBasketProducts] = useState<Product[]>(productsStub);
  const [appliedCoupons, setAppliedCoupons] = useState<string[]>([]);
  const [totalPrice, setTotalPrice] = useState<number | null>(null);
  const [subtotal, setSubtotal] = useState<number>(0);

  const calculatePrices = useCallback(async () => {
    const calculatedSubtotal = basketProducts.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );
    setSubtotal(calculatedSubtotal);

    const apiProducts = basketProducts.map((p) => ({
      name: p.name,
      quantity: p.quantity,
      type: p.type,
      price: p.price,
    }));

    try {
      const calculatedPrice = await basketApi.calculateTotalPrice(
        apiProducts,
        appliedCoupons
      );
      setTotalPrice(calculatedPrice);
    } catch (error) {
      console.error("Error calculating price:", error);
      setTotalPrice(null);
    }
  }, [basketProducts, appliedCoupons]);

  useEffect(() => {
    calculatePrices();
  }, [calculatePrices]);

  const handleAddProduct = (product: Product) => {
    const existingProduct = basketProducts.find((p) => p.id === product.id);
    if (existingProduct) {
      setBasketProducts(
        basketProducts.map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
        )
      );
    } else {
      setBasketProducts([...basketProducts, { ...product, quantity: 1 }]);
    }
  };

  const handleRemoveProduct = (productId: string) => {
    setBasketProducts(basketProducts.filter((p) => p.id !== productId));
  };

  const handleAddCoupon = (couponCode: string) => {
    if (!couponCode.trim() || appliedCoupons.includes(couponCode)) return;
    setAppliedCoupons([...appliedCoupons, couponCode]);
  };

  const handleRemoveCoupon = (couponCode: string) => {
    setAppliedCoupons(appliedCoupons.filter((c) => c !== couponCode));
  };

  return (
    <>
      <AddProductButton onAddProduct={handleAddProduct} />
      <BasketList
        products={basketProducts}
        onRemoveProduct={handleRemoveProduct}
      />
      <BasketTotal
        subtotal={subtotal}
        totalPrice={totalPrice}
        appliedCoupons={appliedCoupons}
        onAddCoupon={handleAddCoupon}
        onRemoveCoupon={handleRemoveCoupon}
      />
    </>
  );
}
