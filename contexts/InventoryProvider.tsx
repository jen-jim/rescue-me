import { ReactNode, useEffect, useState } from "react";
import {
  getInventoryData,
  Inventory,
  saveInventoryData,
} from "../utils/Local-storage";
import { InventoryContext } from "./InventoryContext";

interface InventoryProviderProps {
  children: ReactNode;
}

export default function InventoryProvider({
  children,
}: InventoryProviderProps) {
  const [inventory, setInventory] = useState<Inventory>({
    food: {
      normal: 20,
      vitalityBoost: 3,
      happinessBoost: 3,
      cutenessBoost: 3,
      slowRelease: 5,
    },
    medicines: {
      recoveryBoost: 2,
      growthBoost: 2,
      sleepAid: 3,
    },
    toys: {
      butterflies: 5,
      catScratcher: 1,
    },
  });

  useEffect(() => {
    getInventoryData().then((storageInventory) => {
      if (storageInventory) {
        setInventory(storageInventory);
      }
    });
  }, []);

  useEffect(() => {
    saveInventoryData(inventory);
  }, [inventory]);

  return (
    <InventoryContext.Provider value={{ inventory, setInventory }}>
      {children}
    </InventoryContext.Provider>
  );
}
