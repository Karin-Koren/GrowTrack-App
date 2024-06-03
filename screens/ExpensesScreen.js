import { StyleSheet, Text, View } from "react-native";
import { Expense } from "../models/Expense";
import ExpensesList from "../components/Expenses/ExpensesList";
import MonthlyScroller from "../components/UI/MonthlyScroller";
import { useContext, useEffect, useState } from "react";
import { ExpensesContext } from "../store/ExpensesContext";
import { fetchExpenses } from "../util/http";
import BalanceList from "../components/balance/BalanceList";
import { Colors } from "../constants/colors";
import LoadingOverlay from "../components/UI/LoadingOverlay";

const ExpensesScreen = () => {
  const expensesCtx = useContext(ExpensesContext);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    async function getExpenses() {
      setIsFetching(true);
      try {
        const loadedexpenses = await fetchExpenses();
        expensesCtx.setExpenses(loadedexpenses);
      } catch (error) {
        console.log("could not fetch expenses!");
        console.log(error);
      }
      setIsFetching(false);
      console.log("***");
    }

    getExpenses();
  }, []);

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth(); // Returns a number (0-11) representing the current month
  const currentYear = currentDate.getFullYear(); // Returns the current year (4 digits)

  const [selectedMonthAndYear, setSelectedMonthAndYear] = useState({
    month: currentMonth,
    year: currentYear,
  });

  function changeDataHandler(newData) {
    setSelectedMonthAndYear((prevData) => {
      return {
        ...prevData,
        ...newData,
      };
    });
  }

  const expenses = expensesCtx.expenses.filter((expense) => {
    return (
      expense.date.getMonth() === selectedMonthAndYear.month &&
      expense.date.getFullYear() === selectedMonthAndYear.year
    );
  });
  // console.log(expenses);

  let data = (
    <>
      <BalanceList expenses={expenses} />
      <ExpensesList expenses={expenses} />
    </>
  );

  if (expenses.length < 1) {
    data = (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No Expenses in this month</Text>
      </View>
    );
  }

  if (isFetching) {
    return <LoadingOverlay />;
  }

  return (
    <View style={styles.constiner}>
      <MonthlyScroller onSelectedData={changeDataHandler} />
      {data}
    </View>
  );
};

export default ExpensesScreen;

const styles = StyleSheet.create({
  constiner: {
    marginTop: 20,
    
  },
  emptyContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 70,
  },
  emptyText: {
    fontWeight: "bold",
    fontSize: 24,
    color: Colors.primary800,
  },
});
