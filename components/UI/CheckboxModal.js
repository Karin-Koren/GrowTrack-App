import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Modal from "react-native-modal";

const CheckboxModal = ({ isVisable, onDeleteOption, onClose }) => {
  return (
    <Modal visible={isVisable} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Delete Category Options:</Text>
          <TouchableOpacity
            style={styles.optionButton}
            onPress={onDeleteOption.bind(this, 1)}
          >
            <Text style={styles.optionText}>Delete with Linked Expenses</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.optionButton}
            onPress={onDeleteOption.bind(this, 2)}
          >
            <Text style={styles.optionText}>
              Delete without Linked Expenses
            </Text>
          </TouchableOpacity>
          {/* Add more options as needed */}
          <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>

    // <View>
    //   <TouchableOpacity onPress={toggleModal}>
    //     <Text>Show Modal</Text>
    //   </TouchableOpacity>

    //   <Modal isVisible={isVisable} onBackdropPress={toggleModal}>
    //     <View>
    //       <Text>Select an option:</Text>
    //       <TouchableOpacity onPress={() => handleOptionPress(1)}>
    //         <Text>Option 1</Text>
    //       </TouchableOpacity>
    //       <TouchableOpacity onPress={() => handleOptionPress(2)}>
    //         <Text>Option 2</Text>
    //       </TouchableOpacity>
    //       {/* Add more options as needed */}
    //     </View>
    //   </Modal>
    // </View>
  );
};

export default CheckboxModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%", // Adjust the width as needed
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  optionButton: {
    backgroundColor: "#3498db",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  optionText: {
    color: "white",
    textAlign: "center",
  },
  cancelButton: {
    backgroundColor: "#e74c3c",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  cancelText: {
    color: "white",
    textAlign: "center",
  },
});
