import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Colors } from "../../constants/colors";

const BalanceItem = ({ categoryTitle, budget, totalAmount }) => {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{categoryTitle}</Text>
      </View>
      <View>
        <Text style={styles.balance}>
          {totalAmount}/{budget}
        </Text>
      </View>
    </View>
  );
};

export default BalanceItem;

const styles = StyleSheet.create({
  container: {
    padding: 8,
    borderWidth: 2,
    borderRadius: 8,
    margin: 8,
    marginTop: 2,
    // backgroundColor: "#e4eca9",
    // backgroundColor: "#bc06bc",
    backgroundColor: Colors.primary600,
    minWidth: 120,

    elevation: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
  },
  titleContainer: {
    padding: 4,
  },
  title: {
    textAlign: "center",
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
  },

  balance: {
    color: Colors.primary100,
    fontWeight: "bold",
    textAlign: "center",
  },
});
