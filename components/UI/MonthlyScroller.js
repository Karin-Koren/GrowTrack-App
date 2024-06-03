import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import IconButton from "./IconButton";
import { ScrollView } from "react-native-gesture-handler";
import { Colors } from "../../constants/colors";

const MonthlyScroller = ({ onSelectedData }) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth(); // Returns a number (0-11) representing the current month
  const currentYear = currentDate.getFullYear(); // Returns the current year (4 digits)

  const [selectedMonthIndex, setSelectedMonthIndex] = useState(currentMonth);
  const [selectedYear, setSelectedYear] = useState(currentYear);

  useEffect(() => {
    onSelectedData({
      month: selectedMonthIndex,
      year: selectedYear,
    });
  }, [selectedMonthIndex, selectedYear]);

  function nextMonthHandler() {
    setSelectedMonthIndex((currIndex) =>
      currIndex === 11 ? 0 : currIndex + 1
    );

    if (selectedMonthIndex === 11) {
      setSelectedYear(selectedYear + 1);
    }
  }
  function prevMonthHandler() {
    setSelectedMonthIndex((currIndex) =>
      currIndex === 0 ? 11 : currIndex - 1
    );

    if (selectedMonthIndex === 0) {
      setSelectedYear(selectedYear - 1);
    }
  }

  return (
    <View style={styles.container}>
      <IconButton
        icon="caret-back-outline"
        size={28}
        onPress={prevMonthHandler}
      />

      <View>
        <Text style={styles.monthText}>{months[selectedMonthIndex]}</Text>
        <Text style={styles.yearText}>{selectedYear}</Text>
      </View>
      <IconButton
        icon="caret-forward-outline"
        size={28}
        onPress={nextMonthHandler}
      />
    </View>
  );
};

export default MonthlyScroller;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 20,
    paddingHorizontal: 40,
  },
  textsContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  monthText: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.primary800,
  },
  yearText: {
    textAlign: "center",
    color: Colors.primary400,
  },
});
