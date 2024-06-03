import { StyleSheet, Text, View, FlatList } from "react-native";
import ExpensesItem from "./ExpensesItem";
import { useContext } from "react";
import { ExpensesContext } from "../../store/ExpensesContext";

const ExpensesList = ({ expenses }) => {
  function renderExpense(itemData) {
    return <ExpensesItem {...itemData.item} />;
  }

  return (
    <View>
      <FlatList
        data={expenses}
        keyExtractor={(item) => item.id}
        renderItem={renderExpense}
      />
    </View>
  );
};

export default ExpensesList;

const styles = StyleSheet.create({});
