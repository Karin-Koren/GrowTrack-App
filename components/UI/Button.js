import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Colors } from "../../constants/colors";

const Button = ({ children, onPress, style, mode }) => {
  return (
    <View style={style}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => pressed && styles.pressed}
      >
        <View style={mode === "outline" ? styles.outlineButton : styles.button}>
          <Text style={styles.buutonText}>{children}</Text>
        </View>
      </Pressable>
    </View>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    padding: 8,
    //borderWidth: 2,
    //borderColor: "#9BB8CD",
    //backgroundColor: "#9BB8CD",
    backgroundColor: "#efa47f",
    borderRadius: 6,
  },
  outlineButton: {
    padding: 8,
    borderWidth: 2,
    borderColor: "#efa47f",
    //backgroundColor: "#9BB8CD",
    //backgroundColor: "#efa47f",
    borderRadius: 6,
  },
  pressed: {
    opacity: 0.4,
  },
  buutonText: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: "#01539d",
  },
});
