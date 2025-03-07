import { ReactNode, useEffect, useState } from "react";
import { getPetData, PetData, savePetData } from "../utils/Local-storage";
import { PetContext } from "./PetContext";

interface PetProviderProps {
  children: ReactNode;
}

const initialPetData = {
  name: undefined,
  hunger: 0,
  happiness: 10,
  energy: 100,
  cuteness: 10,
  growth: 5,
  lastUpdated: Date.now(),
};

export default function PetProvider({ children }: PetProviderProps) {
  const [petData, setPetData] = useState<PetData>(initialPetData);

  useEffect(() => {
    getPetData().then((storagePetData) => {
      if (storagePetData) {
        setPetData(storagePetData);
      }
    });
  }, []);

  useEffect(() => {
    savePetData(petData);
  }, [petData]);

  function resetPetData() {
    setPetData(initialPetData);
  }

  return (
    <PetContext.Provider value={{ petData, setPetData, resetPetData }}>
      {children}
    </PetContext.Provider>
  );
}
