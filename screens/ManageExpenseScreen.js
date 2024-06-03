import { StyleSheet, Text, View } from "react-native";
import { useContext, useLayoutEffect, useState } from "react";
import ExpenseForm from "../components/Expenses/ExpenseForm";
import { ExpensesContext } from "../store/ExpensesContext";
import IconButton from "../components/UI/IconButton";
import { Colors } from "../constants/colors";
import { Expense } from "../models/Expense";
import { deleteDate, storeData, updateData } from "../util/http";
import { CategoriesContext } from "../store/CategoriesContext";
import LoadingOverlay from "../components/UI/LoadingOverlay";

const ManageExpenseScreen = ({ route, navigation }) => {
  const expensesCtx = useContext(ExpensesContext);
  const categoriesCtx = useContext(CategoriesContext);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;
  const selectedExpense = expensesCtx.expenses.find(
    // if we adding we get undefined
    (expense) => expense.id === editedExpenseId
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Exspense" : "Add New Expense",
    });
  }, [navigation, isEditing]);

  async function deleteExpenseHandler() {
    setIsSubmitting(true);
    try {
      expensesCtx.deleteExpense(editedExpenseId);
      await deleteDate("expenses", editedExpenseId);
      navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  }

  // function confirmExpenseHandler(expense) {
  //   if (isEditing) {
  //     expensesCtx.updateExpense(editedExpenseId, expense);
  //   } else {
  //     const newExpense = new Expense(
  //       expense.description,
  //       expense.amount,
  //       expense.date,
  //       expense.category
  //     );
  //     expensesCtx.addExpense(newExpense);
  //   }
  //   navigation.goBack();
  // }

  async function confirmExpenseHandler(expense) {
    const thisMonth = new Date().getMonth() === expense.date.getMonth();
    const category = categoriesCtx.categories.find(
      (category) => category.title === expense.category
    );
    try {
      setIsSubmitting(true);
      if (isEditing) {
        if (thisMonth) {
          category.balance =
            category.balance + +selectedExpense.amount - expense.amount;

          console.log("editcategory: " + category);
        }

        expensesCtx.updateExpense(editedExpenseId, expense);
        await updateData("expenses", editedExpenseId, expense);
      } else {
        const id = await storeData("expenses", expense);
        const newExpense = new Expense(
          id,
          expense.description,
          expense.amount,
          expense.date,
          expense.category
        );
        expensesCtx.addExpense(newExpense);
        if (thisMonth) {
          category.balance = category.balance - newExpense.amount;
          console.log("categoryAdd: " + category);
        }
      }
      const editCategory = {
        title: category.title,
        budget: category.budget,
        balance: category.balance,
        available: category.available,
      };

      categoriesCtx.editCategory(category.id, editCategory);
      await updateData("categories", category.id, editCategory);

      navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  }

  function cancleHandler() {
    navigation.goBack();
  }

  if (isSubmitting) {
    return <LoadingOverlay />;
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        submitButtonLabel={isEditing ? "Update" : "Add"}
        defaultValues={selectedExpense}
        onSubmit={confirmExpenseHandler}
        onCancle={cancleHandler}
      />
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={Colors.redLite}
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
};

export default ManageExpenseScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: Colors.redLite,
    alignItems: "center",
  },
});
