import { Text, Modal, View, TouchableOpacity, StyleSheet } from "react-native";

export function HealthInfoModal({
  isHealthModalVisible,
  setHealthModalVisible,
}) {
  function closeModal() {
    setHealthModalVisible(false);
  }

  return (
    <Modal
      visible={isHealthModalVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={closeModal}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Pet's Health</Text>
          <Text style={styles.modalContent}>
            This represents your pet's health status. You need to ensure it
            stays healthy by feeding, giving medicine, and providing care.
          </Text>

          <Text style={styles.modalImportantInfo}>
            The health of your pet will decrease by 1% every minute if no
            interaction is made. If health drops below 5%, the pet will enter
            hibernation.
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

export function FeedInfoModal({
  isFeedInfoModalVisible,
  setFeedInfoModalVisible,
}) {
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
}) {
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
export function PettingInfoModal({
  isPettingInfoModalVisible,
  setPettingInfoModalVisible,
}) {
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
export function CleanInfoModal({
  isCleanInfoModalVisible,
  setCleanInfoModalVisible,
}) {
  function closeModal() {
    setCleanInfoModalVisible(false);
  }

  return (
    <Modal
      visible={isCleanInfoModalVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={closeModal}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Clean your companion</Text>
          <Text style={styles.modalContent}>
            Keep your pet clean not only refreshed to ensure their comfort
            during recovery.
          </Text>

          <Text style={styles.modalImportantInfo}>
            Regular cleaning contributes to your pet's overall health, keeping
            them happy and healthy.
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

export function MainInfoModal({
  isMainInfoModalVisible,
  setMainInfoModalVisible,
}) {
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
          <Text style={styles.modalTitle}>Nurture Chamber</Text>
          <Text style={styles.modalContent}>
            This is where your pet recovers after rescue.
          </Text>

          <Text style={styles.modalImportantInfo}>
            While your pet is here, it is vital to keep its health up to aid
            recovery.
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

export function HibernationModal({ handleExit }) {
  function closeModal() {
    handleExit();
  }

  return (
    <Modal transparent={true} animationType="fade" onRequestClose={closeModal}>
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Pet has entered hibernation</Text>
          <Text style={styles.modalContent}>
            Due to dangerously low health, your pet has entered hibernation
          </Text>

          <Text style={styles.modalImportantInfo}>
            During hibernation, your pet's health remains at 5%. However,
            recovery is paused and recovery time may even increase if your pet
            spends a long time in hibernation.
          </Text>
          {/* and recovery will pause. Revival pills will be required to exit
                    hibernation mode. */}

          <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
            <Text style={styles.modalButtonText}>
              Medicate to exit hibernation
            </Text>
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
