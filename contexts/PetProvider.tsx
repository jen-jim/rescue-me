import { ReactNode, useEffect, useState } from "react";
import { getPetData, PetData, savePetData } from "../utils/Local-storage";
import { PetContext } from "./PetContext";

interface PetProviderProps {
  children: ReactNode;
}

const initialPetData: PetData = {
  name: undefined,
  growth: 1,
  hunger: 30,
  happiness: 0,
  energy: 100,
  cuteness: 10,
  lastUpdated: Date.now(),
  beganIncubation: undefined,
  extraTime: 0,
  justHatched: false,
  remainingSlowReleaseTime: 0,
  incubationHealth: 0.5,
  hibernationBegan: undefined,
  weeklyDistance: [0, 0, 0, 0, 0, 0, 0],
  totalDistanceWalked: 0,
  lastUpdatedWeek: 0,
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

  useEffect(() => {
    const today = new Date();
    const currentWeek = getWeek(today);
    if (petData.lastUpdatedWeek !== currentWeek) {
      setPetData((prev) => ({
        ...prev,
        weeklyDistance: Array(7).fill(0),
        lastUpdatedWeek: currentWeek,
      }));
    }
  }, [petData.lastUpdatedWeek]);

  const getWeek = (date: Date): number => {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDays = (date.getTime() - firstDayOfYear.getTime()) / 86400000; // milliseconds per day
    return Math.ceil((pastDays + firstDayOfYear.getDay() + 1) / 7);
  };

  function resetPetData() {
    setPetData({ ...initialPetData, lastUpdated: Date.now() });
  }

  return (
    <PetContext.Provider value={{ petData, setPetData, resetPetData }}>
      {children}
    </PetContext.Provider>
  );
}
