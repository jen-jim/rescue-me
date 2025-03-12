import { Text, Modal, View, TouchableOpacity, StyleSheet } from "react-native";

type InfoModalProps = {
  isPlayModalVisible: boolean;
  setPlayModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  isFeedInfoModalVisible: boolean;
  setFeedInfoModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  isMedicineInfoModalVisible: boolean;
  setMedicineInfoModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  isPettingInfoModalVisible: boolean;
  setPettingInfoModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  isWalkInfoModalVisible: boolean;
  setWalkInfoModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  isMainInfoModalVisible: boolean;
  setMainInfoModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  isGrowthInfoModalVisible: boolean;
  setGrowthInfoModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  isHungerInfoModalVisible: boolean;
  setHungerInfoModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  isHappinessInfoModalVisible: boolean;
  setHappinessInfoModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  isEnergyInfoModalVisible: boolean;
  setEnergyInfoModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  isCutenessInfoModalVisible: boolean;
  setCutenessInfoModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  isStaminaInfoModalVisible: boolean;
  setStaminaInfoModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  isIntelligenceInfoModalVisible: boolean;
  setIntelligenceInfoModalVisible: React.Dispatch<
    React.SetStateAction<boolean>
  >;
};

export function PlayInfoModal({
  isPlayModalVisible,
  setPlayModalVisible,
}: InfoModalProps) {
  function closeModal() {
    setPlayModalVisible(false);
  }

  return (
    <Modal
      visible={isPlayModalVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={closeModal}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Play with your companion</Text>
          <Text style={styles.modalContent}>
            Engage with your pet by playing fun games like Connect 4 and
            Tic-Tac-Toe. Playing with your pet not only strengthens your bond
            but also earns you rewards.
          </Text>

          <Text style={styles.modalImportantInfo}>
            As you play, your pet learns and improves, making games
            progressively harder. Playing boosts your pet’s happiness but also
            increases hunger and energy loss, so make sure to keep them
            nourished with a variety of food.
          </Text>

          <Text style={styles.modalImportantInfo}>
            Earn rewards to unlock even more exciting games to enjoy with your
            pet.
          </Text>

          <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
            <Text style={styles.modalButtonText}>Got it!</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

export function FeedInfoModal({
  isFeedInfoModalVisible,
  setFeedInfoModalVisible,
}: InfoModalProps) {
  function closeModal() {
    setFeedInfoModalVisible(false);
  }

  return (
    <Modal
      visible={isFeedInfoModalVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={closeModal}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Feed your companion</Text>
          <Text style={styles.modalContent}>
            Keep your pet healthy by feeding it delicious and nutritious food.
            Select special food types from your inventory or feed default food.
          </Text>

          <Text style={styles.modalImportantInfo}>
            If you do not feed your pet, it may die.
          </Text>
          {/* and recovery will pause. Revival pills will be required to exit
                      hibernation mode. */}

          <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
            <Text style={styles.modalButtonText}>Got it!</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

export function MedicineInfoModal({
  isMedicineInfoModalVisible,
  setMedicineInfoModalVisible,
}: InfoModalProps) {
  function closeModal() {
    setMedicineInfoModalVisible(false);
  }

  return (
    <Modal
      visible={isMedicineInfoModalVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={closeModal}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Medicate your companion</Text>
          <Text style={styles.modalContent}>
            Help your pet recover by providing medicine from your inventory.
          </Text>

          <Text style={styles.modalImportantInfo}>
            Medicine is beneficial for a smooth recovery. However, overdosing
            will reduce pet health and may result in death.
          </Text>

          <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
            <Text style={styles.modalButtonText}>Got it!</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
export function PettingInfoModal({
  isPettingInfoModalVisible,
  setPettingInfoModalVisible,
}: InfoModalProps) {
  function closeModal() {
    setPettingInfoModalVisible(false);
  }

  return (
    <Modal
      visible={isPettingInfoModalVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={closeModal}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Pet your companion</Text>
          <Text style={styles.modalContent}>
            Show your pet affection by petting them. This loving gesture helps
            build a stronger bond.
          </Text>

          <Text style={styles.modalImportantInfo}>
            Petting your companion boosts their emotional well-being, leading to
            improved health.
          </Text>

          <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
            <Text style={styles.modalButtonText}>Got it!</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
export function WalkInfoModal({
  isWalkInfoModalVisible,
  setWalkInfoModalVisible,
}: InfoModalProps) {
  function closeModal() {
    setWalkInfoModalVisible(false);
  }

  return (
    <Modal
      visible={isWalkInfoModalVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={closeModal}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Take your companion for a walk</Text>
          <Text style={styles.modalContent}>
            Taking your pet for a walk helps them stay active and boosts their
            well-being. It's also a great opportunity to find food, including
            special foods to give your pet the boost it needs!
          </Text>

          <Text style={styles.modalImportantInfo}>
            Walking decreases your pet's energy and increase their hunger.
            However, consistent walking helps build stamina, allowing you to
            take them on longer walks and improving their overall energy levels.
            Make sure to take them out regularly to keep their strength up.
          </Text>

          <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
            <Text style={styles.modalButtonText}>Got it!</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

export function MainInfoModal({
  isMainInfoModalVisible,
  setMainInfoModalVisible,
}: InfoModalProps) {
  function closeModal() {
    setMainInfoModalVisible(false);
  }

  return (
    <Modal
      visible={isMainInfoModalVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={closeModal}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Welcome</Text>
          <Text style={styles.modalContent}>
            This is where your pet lives until you take them out for a walk.
            Here, you can monitor your pet’s well-being and interact with them.
            You can feed, pet, medicate, and more to keep them healthy and
            happy.
          </Text>

          <Text style={styles.modalImportantInfo}>
            All actions here contribute to your pet’s overall well-being.
          </Text>

          <Text style={styles.modalImportantInfo}>
            Remember to check on your pet regularly to ensure they don't enter a
            depressed state. This can occur when happiness and energy are
            critically low for an extended period. Whilst your pet in this state
            growth, stamina and cuteness will be negatively affected, and a
            special medication will be required to exit this state.
          </Text>

          <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
            <Text style={styles.modalButtonText}>Got it!</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

// export function HibernationModal({ handleExit }) {
//   function closeModal() {
//     handleExit();
//   }

//   return (
//     <Modal transparent={true} animationType="fade" onRequestClose={closeModal}>
//       <View style={styles.modalBackground}>
//         <View style={styles.modalContainer}>
//           <Text style={styles.modalTitle}>Pet has entered hibernation</Text>
//           <Text style={styles.modalContent}>
//             Due to dangerously low health, your pet has entered hibernation
//           </Text>

//           <Text style={styles.modalImportantInfo}>
//             During hibernation, your pet's health remains at 5%. However,
//             recovery is paused and recovery time may even increase if your pet
//             spends a long time in hibernation.
//           </Text>
//           {/* and recovery will pause. Revival pills will be required to exit
//                     hibernation mode. */}

//           <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
//             <Text style={styles.modalButtonText}>
//               Medicate to exit hibernation
//             </Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </Modal>
//   );
// }

export function GrowthInfoModal({
  isGrowthInfoModalVisible,
  setGrowthInfoModalVisible,
}: InfoModalProps) {
  function closeModal() {
    setGrowthInfoModalVisible(false);
  }

  return (
    <Modal
      visible={isGrowthInfoModalVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={closeModal}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Growth Level</Text>
          <Text style={styles.modalContent}>
            This section helps you monitor your pet's growth. Make sure to keep
            your pet healthy for optimal development.
          </Text>

          <Text style={styles.modalImportantInfo}>
            A healthy pet grows faster and reaches new milestones more quickly.
          </Text>

          <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
            <Text style={styles.modalButtonText}>Got it!</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

export function StaminaInfoModal({
  isStaminaInfoModalVisible,
  setStaminaInfoModalVisible,
}: InfoModalProps) {
  function closeModal() {
    setStaminaInfoModalVisible(false);
  }

  return (
    <Modal
      visible={isStaminaInfoModalVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={closeModal}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Stamina Level</Text>
          <Text style={styles.modalContent}>
            Regular walks are key to building your pet’s stamina. As your pet
            becomes more accustomed to exercise, their energy levels stay higher
            for longer, allowing them to go on longer walks and play more games
            before tiring out.
          </Text>

          <Text style={styles.modalImportantInfo}>
            With increased stamina, your pet will be able to enjoy more
            activities, improving their overall well-being and happiness.
          </Text>

          <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
            <Text style={styles.modalButtonText}>Got it!</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
export function IntelligenceInfoModal({
  isIntelligenceInfoModalVisible,
  setIntelligenceInfoModalVisible,
}: InfoModalProps) {
  function closeModal() {
    setIntelligenceInfoModalVisible(false);
  }

  return (
    <Modal
      visible={isIntelligenceInfoModalVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={closeModal}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Intelligence Level</Text>
          <Text style={styles.modalContent}>
            Regular games are key to building your pet’s intelligence. As your
            pet becomes more intelligent, games will become harder to win. Your
            pet won't go easy on you!
          </Text>

          <Text style={styles.modalImportantInfo}>
            As your pet's intelligence increases, new games will be unlocked for
            you to enjoy with your pet. This will improve their overall
            well-being and happiness.
          </Text>

          <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
            <Text style={styles.modalButtonText}>Got it!</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

export function HungerInfoModal({
  isHungerInfoModalVisible,
  setHungerInfoModalVisible,
}: InfoModalProps) {
  function closeModal() {
    setHungerInfoModalVisible(false);
  }

  return (
    <Modal
      visible={isHungerInfoModalVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={closeModal}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Hunger Level</Text>
          <Text style={styles.modalContent}>
            Make sure to feed your pet regularly to keep their energy up.
          </Text>

          <Text style={styles.modalImportantInfo}>
            If your pet's hunger reaches critical levels, they may become weak,
            affecting their health.
          </Text>

          <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
            <Text style={styles.modalButtonText}>Got it!</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
export function HappinessInfoModal({
  isHappinessInfoModalVisible,
  setHappinessInfoModalVisible,
}: InfoModalProps) {
  function closeModal() {
    setHappinessInfoModalVisible(false);
  }

  return (
    <Modal
      visible={isHappinessInfoModalVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={closeModal}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Happiness Level</Text>
          <Text style={styles.modalContent}>
            Keep your pet happy by interacting with them and providing care.
          </Text>
          <Text style={styles.modalImportantInfo}>
            A happy pet is a healthy pet! Make sure to pet, feed, and walk your
            companion to maintain their happiness.
          </Text>
          <Text style={styles.modalImportantInfo}>
            If happiness levels remain low for an extended period, your pet may
            enter a depressed state wherein stamina, growth, energy and cuteness
            will be negatively affected. Special medication will be required to
            exit the depressed state.
          </Text>
          <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
            <Text style={styles.modalButtonText}>Got it!</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
export function EnergyInfoModal({
  isEnergyInfoModalVisible,
  setEnergyInfoModalVisible,
}: InfoModalProps) {
  function closeModal() {
    setEnergyInfoModalVisible(false);
  }

  return (
    <Modal
      visible={isEnergyInfoModalVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={closeModal}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Energy Level</Text>
          <Text style={styles.modalContent}>
            Ensure your pet has enough energy by feeding and playing with them.
          </Text>

          <Text style={styles.modalImportantInfo}>
            Low energy may hinder your pet's ability to interact. Keep them
            energised!
          </Text>
          <Text style={styles.modalImportantInfo}>
            Energy decreases faster while your pet is interacting with you.
            However, higher stamina levels help keep your pet's energy stable
            for longer periods. Very high happiness levels also pause energy
            loss.
          </Text>
          <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
            <Text style={styles.modalButtonText}>Got it!</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
export function CutenessInfoModal({
  isCutenessInfoModalVisible,
  setCutenessInfoModalVisible,
}: InfoModalProps) {
  function closeModal() {
    setCutenessInfoModalVisible(false);
  }

  return (
    <Modal
      visible={isCutenessInfoModalVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={closeModal}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Cuteness Level</Text>
          <Text style={styles.modalContent}>
            Keep an eye on your pet’s cuteness! The more you care for them, the
            cuter they become.
          </Text>

          <Text style={styles.modalImportantInfo}>
            Higher cuteness levels increase your pet's popularity and boost
            their happiness.
          </Text>

          <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
            <Text style={styles.modalButtonText}>Got it!</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#5a4a42",
  },
  modalContent: {
    fontSize: 16,
    marginBottom: 20,
    color: "#5a4a42",
    textAlign: "justify",
  },
  modalImportantInfo: {
    fontSize: 16,
    fontWeight: "600",
    color: "#d9534f",
    textAlign: "justify",
    marginBottom: 20,
    // paddingHorizontal: 20,
  },
  modalButton: {
    backgroundColor: "#ff6b6b",
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 10,
  },
  modalButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
