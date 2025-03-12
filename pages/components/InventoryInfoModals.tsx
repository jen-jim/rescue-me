import { Text, Modal, View, TouchableOpacity, StyleSheet } from "react-native";

type MainInfoModalProps = {
  isMainInfoModalVisible: boolean;
  setMainInfoModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

export function MainInfoModal({
  isMainInfoModalVisible,
  setMainInfoModalVisible,
}: MainInfoModalProps) {
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
          <Text style={styles.modalTitle}>Inventory</Text>
          <Text style={styles.modalContent}>
            This is where all your collected items are stored.
          </Text>

          <Text style={styles.modalImportantInfo}>
            Some items are consumable, while others are used for special tasks.
          </Text>

          <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
            <Text style={styles.modalButtonText}>Got it!</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

interface MasterInfoModalProps {
  isVisible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  content: string;
  importantInfo?: string;
}

const InfoModal: React.FC<MasterInfoModalProps> = ({
  isVisible,
  setVisible,
  title,
  content,
  importantInfo,
}) => {
  function closeModal() {
    setVisible(false);
  }

  if (!isVisible) return null; //(to prevent rendering when not needed - may slow down app?)

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={closeModal}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>{title}</Text>
          <Text style={styles.modalContent}>{content}</Text>
          {importantInfo && (
            <Text style={styles.modalImportantInfo}>{importantInfo}</Text>
          )}
          <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
            <Text style={styles.modalButtonText}>Got it!</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

interface InfoModalProps {
  isVisible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

// Category Info Modals
export function FoodCategoryModal({ isVisible, setVisible }: InfoModalProps) {
  return (
    <InfoModal
      isVisible={isVisible}
      setVisible={setVisible}
      title="Food"
      content="Food items help maintain your pet’s health, happiness, and overall well-being. Some foods provide extra benefits such as boosting vitality or happiness."
    />
  );
}

export function MedicineCategoryModal({
  isVisible,
  setVisible,
}: InfoModalProps) {
  return (
    <InfoModal
      isVisible={isVisible}
      setVisible={setVisible}
      title="Medicines"
      content="Medicines aid in recovery, growth, and relaxation. Proper medication helps ensure your pet stays in peak condition."
    />
  );
}

export function ToyCategoryModal({ isVisible, setVisible }: InfoModalProps) {
  return (
    <InfoModal
      isVisible={isVisible}
      setVisible={setVisible}
      title="Toys"
      content="Toys keep your pet entertained and engaged. They provide emotional and mental stimulation, improving happiness and overall well-being."
    />
  );
}

// Food Item Modals
export function NormalFoodModal({ isVisible, setVisible }: InfoModalProps) {
  return (
    <InfoModal
      isVisible={isVisible}
      setVisible={setVisible}
      title="Normal Food"
      content="A staple food that satisfies your pet’s hunger and maintains their health."
    />
  );
}

export function VitalityBoostFoodModal({
  isVisible,
  setVisible,
}: InfoModalProps) {
  return (
    <InfoModal
      isVisible={isVisible}
      setVisible={setVisible}
      title="Vitality Boost Food"
      content="This food replenishes energy and helps your pet achieve milestones faster."
    />
  );
}

export function HappinessBoostFoodModal({
  isVisible,
  setVisible,
}: InfoModalProps) {
  return (
    <InfoModal
      isVisible={isVisible}
      setVisible={setVisible}
      title="Happiness Boost Food"
      content="A special treat that significantly boosts your pet’s happiness."
    />
  );
}

export function CutenessBoostFoodModal({
  isVisible,
  setVisible,
}: InfoModalProps) {
  return (
    <InfoModal
      isVisible={isVisible}
      setVisible={setVisible}
      title="Cuteness Boost Food"
      content="A delightful snack that enhances your pet’s cuteness."
    />
  );
}

export function SlowReleaseFoodModal({
  isVisible,
  setVisible,
}: InfoModalProps) {
  return (
    <InfoModal
      isVisible={isVisible}
      setVisible={setVisible}
      title="Slow Release Food"
      content="A steady-energy meal that keeps your pet’s energy levels high for longer."
    />
  );
}

// Medicine Item Modals
export function RecoveryBoostMedicineModal({
  isVisible,
  setVisible,
}: InfoModalProps) {
  return (
    <InfoModal
      isVisible={isVisible}
      setVisible={setVisible}
      title="Recovery Boost Medicine"
      content="Speeds up your pet’s recovery process, helping them heal faster."
    />
  );
}

export function GrowthBoostMedicineModal({
  isVisible,
  setVisible,
}: InfoModalProps) {
  return (
    <InfoModal
      isVisible={isVisible}
      setVisible={setVisible}
      title="Growth Boost Medicine"
      content="Enhances your pet’s growth rate, helping them reach their next stage sooner."
    />
  );
}

export function SleepAidMedicineModal({
  isVisible,
  setVisible,
}: InfoModalProps) {
  return (
    <InfoModal
      isVisible={isVisible}
      setVisible={setVisible}
      title="Sleep Aid Medicine"
      content="Helps your pet rest better, improving their overall energy and recovery."
    />
  );
}

// Toy Item Modals
export function ButterfliesToyModal({ isVisible, setVisible }: InfoModalProps) {
  return (
    <InfoModal
      isVisible={isVisible}
      setVisible={setVisible}
      title="Butterflies"
      content="A beautiful set of butterflies that captivates and entertains your pet, increasing happiness."
    />
  );
}

export function CatScratcherToyModal({
  isVisible,
  setVisible,
}: InfoModalProps) {
  return (
    <InfoModal
      isVisible={isVisible}
      setVisible={setVisible}
      title="Cat Scratcher"
      content="A fun scratching post that keeps your pet entertained and relieves stress."
    />
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
