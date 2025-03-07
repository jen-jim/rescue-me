import AsyncStorage from "@react-native-async-storage/async-storage";

export type PetData = {
  name: string | undefined;
  hunger: number;
  happiness: number;
  energy: number;
  cuteness: number;
  growth: number;
  lastUpdated: number;
};

export const savePetData = async (pet: PetData) => {
  try {
    await AsyncStorage.setItem("pet", JSON.stringify(pet));
    console.log("Pet data saved");
  } catch (error) {
    console.error("Error saving pet data:", error);
  }
};

export const getPetData = async () => {
  try {
    const data = await AsyncStorage.getItem("pet");
    return data != null ? (JSON.parse(data) as PetData) : null;
  } catch (error) {
    console.error("Error reading pet data:", error);
    return null;
  }
};

export type FoodInventory = {
  normal: number;
  vitalityBoost: number;
  happinessBoost: number;
  cutenessBoost: number;
  slowRelease: number;
};

export type MedicineInventory = {
  recoveryBoost: number;
  growthBoost: number;
  sleepAid: number;
};

export type ToyInventory = {
  butterflies: number;
  catScratcher: number;
};

export type InventoryKeys =
  | keyof FoodInventory
  | keyof MedicineInventory
  | keyof ToyInventory;

export type Inventory = {
  food: FoodInventory;
  medicines: MedicineInventory;
  toys: ToyInventory;
};

export const saveInventoryData = async (inventory: Inventory) => {
  try {
    await AsyncStorage.setItem("inventory", JSON.stringify(inventory));
    console.log("Inventory data saved");
  } catch (error) {
    console.error("Error saving inventory data:", error);
  }
};

export const getInventoryData = async () => {
  try {
    const data = await AsyncStorage.getItem("inventory");
    return data != null ? (JSON.parse(data) as Inventory) : null;
  } catch (error) {
    console.error("Error reading inventory data:", error);
    return null;
  }
};

// // how to use pet storage functions

// // example pet obj
// const pet = {
//   name: "Fluffy",
//   happiness: 80,
//   hunger: 20,
// };

//  // set State for pet stats, using a default
//  const [petData, setPetData] = useState({
//     name: "Fluffy",
//     happiness: 80,
//     hunger: 20,
//   });

// // Load pet data when the component is first mounted

// useEffect(() => {
//     async function loadPet() {
//       const storedPet = await getPetData();
//       if (storedPet) {
//         setPetData(storedPet);
//       }
//     }
//     loadPet();
//   }, []);

//   // function to update pet data in state and AsyncStorage

//   const updatePetData = async (newData) => {
//     setPetData(newData);
//     await savePetData(newData);
//   };

//   // need to find out if mount persists when screen is changed, using reacts useEffect, cleanup fucntion
//   // if mount persists need to handle refetch of data when screen is loaded again or unmount pages when screen is changed
