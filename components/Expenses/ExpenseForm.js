import { StyleSheet, Text, View, TextInput, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useContext, useState } from "react";
import { CategoriesContext } from "../../store/CategoriesContext";
import { Colors } from "../../constants/colors";
import ExpenseInput from "./ExpenseInput";
import Button from "../UI/Button";
import { Expense } from "../../models/Expense";
import { getFormattedDate } from "../../util/date";
import { ExpensesContext } from "../../store/ExpensesContext";

const ExpenseForm = ({
  defaultValues,
  onSubmit,
  onCancle,
  submitButtonLabel,
}) => {
  const categoriesCtx = useContext(CategoriesContext);

  availableCategory = categoriesCtx.categories.filter(
    (category) => category.available
  );
  const [inputs, setInputs] = new useState({
    amount: {
      value: defaultValues ? defaultValues.amount.toString() : "",
      isValid: true,
    },
    date: {
      value: defaultValues ? getFormattedDate(defaultValues.date) : "",
      isValid: true,
    },
    description: {
      value: defaultValues ? defaultValues.description : "",
      isValid: true,
    },
    category: {
      value: defaultValues
        ? defaultValues.categoryTitle
        : categoriesCtx.categories[0].title,
    },
    isValid: true,
  });

  function inputsChangeHandler(identifier, enteredValue) {
    setInputs((curInputs) => {
      return {
        ...curInputs,
        [identifier]: { value: enteredValue, isValid: true },
      };
    });
  }

  function submitHandler() {
    const expense = {
      description: inputs.description.value,
      amount: +inputs.amount.value,
      date: new Date(inputs.date.value),
      category: inputs.category.value,
    };

    const amountIsValid = !isNaN(expense.amount) && expense.amount > 0;
    const dateIsValid = expense.date.toString() !== "Invalid Date";
    const descriptionIsValid = expense.description.trim().length > 0;

    const category = categoriesCtx.categories.find(
      (category) => category.title === expense.category
    );

    const thisMonth = new Date().getMonth() === expense.date.getMonth();
    if (thisMonth && category.balance - expense.amount < 0) {
      Alert.alert("Budget Exceeded", "The amount exceeds the budget");
      return;
    }

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      setInputs((currInputs) => {
        return {
          amount: { value: currInputs.amount.value, isValid: amountIsValid },
          date: { value: currInputs.date.value, isValid: dateIsValid },
          description: {
            value: currInputs.description.value,
            isValid: descriptionIsValid,
          },
          category: { value: currInputs.category.value, isValid: true },
        };
      });
      return;
    }
    onSubmit(expense);
  }

  const formIsInvalid =
    !inputs.amount.isValid ||
    !inputs.date.isValid ||
    !inputs.description.isValid;

  return (
    <View>
      <View style={styles.inputsRow}>
        <ExpenseInput
          label="Amount"
          style={{ flex: 1 }}
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: inputsChangeHandler.bind(this, "amount"),
            value: inputs.amount.value,
          }}
          invalid={!inputs.amount.isValid}
        />
        <ExpenseInput
          label="Date"
          style={{ flex: 1 }}
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: inputsChangeHandler.bind(this, "date"),
            value: inputs.date.value,
          }}
          invalid={!inputs.date.isValid}
        />
      </View>
      <View>
        <ExpenseInput
          label="Description"
          textInputConfig={{
            autoCorrect: false,
            onChangeText: inputsChangeHandler.bind(this, "description"),
            value: inputs.description.value,
          }}
          invalid={!inputs.description.isValid}
        />
      </View>
      <View style={styles.categoryConainer}>
        <Text style={styles.PickerLabel}>Category</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={inputs.category.value}
            onValueChange={inputsChangeHandler.bind(this, "category")}
            style={styles.picker}
          >
            {availableCategory.map((category) => (
              <Picker.Item
                label={category.title}
                value={category.title}
                key={category.id}
              />
            ))}
          </Picker>
        </View>
      </View>
      {formIsInvalid && (
        <Text style={styles.errorText}>
          {" "}
          Invalid input values - please check your enterd data!
        </Text>
      )}
      <View style={styles.buttons}>
        <Button style={styles.button} mode="outline" onPress={onCancle}>
          Cancle
        </Button>
        <Button style={styles.button} onPress={submitHandler}>
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  );
};

export default ExpenseForm;

const styles = StyleSheet.create({
  form: {
    marginTop: 24,
  },
  inputsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  PickerLabel: {
    marginBottom: 4,
    fontSize: 16,
    fontWeight: "bold",
  },
  categoryConainer: {
    // flexDirection: "row",
    // justifyContent: "space-between",
    marginTop: 12,
  },
  pickerContainer: {
    backgroundColor: Colors.backround4,
    // width: 100,
  },
  picker: {
    // width:
    fontWeight: "bold",
  },
  buttons: {
    margin: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  errorText: {
    fontSize: 16,
    color: Colors.error500,
    fontWeight: "bold",
    textAlign: "center",
    margin: 8,
  },
});
