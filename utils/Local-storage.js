import AsyncStorage from "@react-native-async-storage/async-storage";

export const savePetData = async (pet) => {
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
    return data != null ? JSON.parse(data) : null;
  } catch (error) {
    console.error("Error reading pet data:", error);
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
