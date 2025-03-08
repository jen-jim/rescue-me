import { ReactNode, useEffect, useState } from "react";
import { getPetData, PetData, savePetData } from "../utils/Local-storage";
import { PetContext } from "./PetContext";

interface PetProviderProps {
  children: ReactNode;
}

const initialPetData: PetData = {
  name: undefined,
  hunger: 30,
  happiness: 0,
  energy: 100,
  cuteness: 10,
  growth: 1,
  lastUpdated: Date.now(),
  beganIncubation: undefined,
  extraTime: 0,
  justHatched: false,
  remainingSlowReleaseTime: 0,
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
