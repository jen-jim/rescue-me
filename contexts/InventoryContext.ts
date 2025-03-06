import { createContext, Dispatch, SetStateAction } from "react";
import { Inventory } from "../utils/Local-storage";

type InventoryContext = {
  inventory: Inventory;
  setInventory: Dispatch<SetStateAction<Inventory>>;
};

export const InventoryContext = createContext<InventoryContext>(
  {} as InventoryContext
);
