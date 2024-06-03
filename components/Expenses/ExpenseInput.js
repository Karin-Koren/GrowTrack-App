import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { Colors } from "../../constants/colors";

const ExpenseInput = ({ label, textInputConfig, style, invalid }) => {
  return (
    <View style={[styles.inputContainer, style]}>
      <Text style={[styles.label, invalid && styles.invalidLabel]}>
        {label}
      </Text>
      <TextInput
        style={[styles.input, invalid && styles.invalidInput]}
        {...textInputConfig}
      />
    </View>
  );
};

export default ExpenseInput;

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 8,
  },
  input: {
    borderRadius: 6,
    fontSize: 18,
    padding: 6,
    backgroundColor: Colors.backround4,
    borderBottomWidth: 0,
  },
  label: {
    marginBottom: 4,
    fontSize: 16,
    fontWeight: "bold",
  },
  invalidInput: {
    borderWidth: 3,
    borderBottomWidth: 3,
    borderColor: Colors.error50,
  },
  invalidLabel: {
    color: Colors.error500,
  },
});
