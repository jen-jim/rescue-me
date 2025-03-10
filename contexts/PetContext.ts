import { createContext, Dispatch, SetStateAction } from "react";
import { PetData } from "../utils/Local-storage";

type PetContext = {
  petData: PetData;
  setPetData: Dispatch<SetStateAction<PetData>>;
  resetPetData: () => void;
};

export const PetContext = createContext<PetContext>({} as PetContext);
