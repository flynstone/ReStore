import { createContext, PropsWithChildren, useContext, useState } from "react";
import { Basket } from "../models/basket";

interface StoreContextValue {
  basket: Basket | null;
  setBasket: (basket: Basket) => void;
  removeItem: (productId: number, quantity: number) => void;
}

export const StoreContext = createContext<StoreContextValue | undefined>(undefined);

// Custom hook.
export function useStoreContext() {
  // Initialize hook.
  const context = useContext(StoreContext);

  // Handle error.
  if (context === undefined) {
    throw Error('Failed to reach the provider')
  }

  return context;
}

// Use react type to identify what this object is.
export function StoreProvider({children}: PropsWithChildren<any>) {
  // Create our States and Methods
  const [basket, setBasket] = useState<Basket | null>(null);

  // Function to remove items from the basket.
  const removeItem = (productId: number, quantity: number) => {
    // Handle null
    if (!basket) return;

    // Create a copy of our items in our basket.
    const items = [...basket.items];

    // Find the index of the products that we're trying to update inide the array. 
    const itemIndex = items.findIndex(i => i.productId === productId);

    // Make sure there is an product
    if (itemIndex >= 0) {
      // Reduce quantity of product.
      items[itemIndex].quantity -= quantity;
      // If the product quantity reaches 0, remove it from the basket.
      if (items[itemIndex].quantity === 0) items.splice(itemIndex, 1);
      // Set basket state
      setBasket(prevState => {
        return {...prevState!, items}
      })
    }
  }

  return (
    <StoreContext.Provider value={{basket, setBasket, removeItem}}>
      {children}
    </StoreContext.Provider>
  )
}