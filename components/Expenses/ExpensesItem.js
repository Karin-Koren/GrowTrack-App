import { Pressable, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/colors";
import { getFormattedDate } from "../../util/date";
import { useNavigation } from "@react-navigation/native";

const ExpensesItem = ({ categoryTitle, description, id, amount, date }) => {
  const navigation = useNavigation();

  function expensePressHandler() {
    navigation.navigate("ManageExpense", {
      expenseId: id,
    });
  }

  return (
    <Pressable
      onPress={expensePressHandler}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={styles.container}>
        <View style={styles.detailContainer}>
          <Text style={[styles.text, styles.descriptionText]}>
            {description}
          </Text>
          <Text style={[styles.text, styles.dateText]}>
            {getFormattedDate(date)}
          </Text>
        </View>
        <View style={styles.categoryContiner}>
          <Text style={[styles.text, styles.categoryText]}>
            {categoryTitle}
          </Text>
        </View>
        <View style={styles.amountContainer}>
          <Text style={[styles.text, styles.amountText]}>{amount}</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default ExpensesItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: Colors.backround4,
    margin: 6,
    padding: 8,
    borderRadius: 8,
    elevation: 3,
    shadowColor: "bleck",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
  },
  pressed: {
    opacity: 0.5,
  },
  detailContainer: {
    flex: 2,
  },
  categoryContiner: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: Colors.backround,
    alignItems: "center",
    borderRadius: 10,
    margin: 9,
  },
  amountContainer: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center",
  },

  text: {},
  categoryText: {
    fontSize: 18,
  },
  descriptionText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  amountText: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.primary600,
  },
  dateText: {},
});
