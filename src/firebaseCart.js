import { FIREBASE_URL } from "./firebase";

export const fetchCart = async () => {
  const response = await fetch(
    `${FIREBASE_URL}/cart.json`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch cart");
  }

  const data = await response.json();

  return data;
};

export const saveCart = async (cart) => {
  const response = await fetch(
    `${FIREBASE_URL}/cart.json`,
    {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        items: cart.items,
        totalQuantity: cart.totalQuantity,
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to save cart");
  }

  return response.json();
};