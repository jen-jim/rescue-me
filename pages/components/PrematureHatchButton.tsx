import { useState } from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

export default function PrematureHatchButton({ progress, handleHatch }) {
  const [isModalVisible, setModalVisible] = useState(false);
  const [isInfoVisible, setInfoVisible] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[
            styles.prematureButton,
            progress >= 0.8
              ? styles.prematureButtonEnabled
              : styles.prematureButtonDisabled,
          ]}
          activeOpacity={progress >= 0.8 ? 1 : 0.6}
          onPress={() => {
            progress < 0.8 ? setInfoVisible(true) : setModalVisible(true);
          }}
        >
          <Text style={styles.prematureButtonText}>Take Me Home Early</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="fade"
        transparent
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.overlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.warningTitle}> ⚠️ Warning: </Text>
            <Text style={styles.warningText}>
              Premature removal from the Nurture Chamber will disrupt your
              companion’s recovery. They may require additional care and support
              outside the chamber.
            </Text>
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.confirmButton}
                onPress={() => {
                  setModalVisible(false);
                  handleHatch();
                }}
              >
                <Text style={styles.confirmButtonText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="fade"
        transparent
        visible={isInfoVisible}
        onRequestClose={() => setInfoVisible(false)}
      >
        <View style={styles.overlay}>
          <View style={styles.infoModalContainer}>
            <Text style={styles.infoText}>
              Your companion's health must be above 80% in order to attempt
              early removal from the Nurture Chamber.
            </Text>
            <TouchableOpacity
              onPress={() => setInfoVisible(false)}
              style={styles.closeButton}
            >
              <Icon name="close" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: "center" },
  buttonRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  prematureButton: {
    marginVertical: 20,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  prematureButtonEnabled: {
    //backgroundColor: "#ba68c8"
    backgroundColor: "#ff6b6b",
  },
  prematureButtonDisabled: {
    //backgroundColor: "#d1a3e0"
    backgroundColor: "#ffb3b3",
    opacity: 0.6,
  },
  prematureButtonText: { color: "white", fontSize: 16, fontWeight: "bold" },
  infoIcon: { marginLeft: 10 },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "#2e2e2e",
    padding: 20,
    borderRadius: 15,
    width: "80%",
    alignItems: "center",
  },
  warningTitle: {
    color: "#ffcc00",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  warningText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  cancelButton: {
    backgroundColor: "#666",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    flex: 1,
    marginRight: 10,
    alignItems: "center",
  },
  cancelButtonText: { color: "white", fontSize: 16 },
  confirmButton: {
    backgroundColor: "#ff6b6b",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    flex: 1,
    marginLeft: 10,
    alignItems: "center",
  },
  confirmButtonText: { color: "white", fontSize: 16, fontWeight: "bold" },
  infoModalContainer: {
    backgroundColor: "#333",
    padding: 20,
    borderRadius: 10,
    width: "70%",
    alignItems: "center",
    position: "relative",
  },
  infoText: { color: "white", fontSize: 16, textAlign: "center" },
  closeButton: { position: "absolute", top: 10, right: 10 },
});
