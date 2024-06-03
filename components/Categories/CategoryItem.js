import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
  Modal,
  TouchableOpacity,
} from "react-native";
import IconButton from "../UI/IconButton";
import { Colors } from "../../constants/colors";
import { Fragment, useContext, useEffect, useState } from "react";
import { CategoriesContext } from "../../store/CategoriesContext";
import CategoryForm from "./CategoryForm";
import { deleteDate, updateData } from "../../util/http";
import CheckboxModal from "../UI/CheckboxModal";
import { ExpensesContext } from "../../store/ExpensesContext";

const CategoryItem = ({ id, title, budget, balance, isAdd }) => {
  const categoriesCtx = useContext(CategoriesContext);
  const expensesCtx = useContext(ExpensesContext);

  const [isEdit, setIsEdit] = useState(isAdd);
  const [editedtitle, setEeditedtitle] = useState(title);
  const [editedBuget, setEeditedBuget] = useState(budget.toString());

  const [isModalVisible, setModalVisible] = useState(false);

  function categoryInputChangeHandler(enteredText) {
    setEeditedtitle(enteredText);
  }

  function bugetInputChangeHandler(enteredText) {
    setEeditedBuget(enteredText);
  }

  async function updateCategory(isAvailable) {
    const editedCategory = {
      title: editedtitle,
      budget: editedBuget,
      balance: editedBuget - (budget - balance), //The new budget minus how much I spent
      available: isAvailable,
    };
    try {
      categoriesCtx.editCategory(id, editedCategory);
      await updateData("categories", id, editedCategory);
    } catch (error) {}
  }

  async function editCategoryHandler() {
    if (!isEdit) {
      setIsEdit(true);
    } else {
      // update a category
      if (isNaN(editedBuget) || +editedBuget < 0) {
        //Validating an updated budget
        //
        Alert.alert("Invalid Data", "Please insert valid data!");
        setEeditedBuget("");
        return;
      }
      if (editedtitle.trim().length < 1) {
        //Validating an updated title
        Alert.alert("Empty Category", "Cant insert a empty category!");
        return;
      }
      //Category update

      updateCategory(true);
      setIsEdit(false);
    }
  }

  function deleteButtonPressHandler() {
    setModalVisible(true);
  }

  async function removeCategoryHandler(option) {
    closeModelHandler();
    if (option == 1) {
      const deleteExpenses = expensesCtx.expenses.filter((expense) => {
        console.log("title: ", title);
        console.log("category: ", expense.categoryTitle);
        return expense.categoryTitle.trim() === title.trim();
      });
      //console.log("deleteExpenses: ", deleteExpenses);

      deleteExpenses.map(async (expense) => {
        try {
          expensesCtx.deleteExpense(expense.id);
          await deleteDate("expenses", expense.id);
          console.log("delete!");
        } catch (error) {
          console.log(error);
        }
      });
      deleteDate("categories", id);
      categoriesCtx.removeCategory(id);
    } else if (option == 2) {
      updateCategory(false);
    }
  }

  function closeModelHandler() {
    setModalVisible(false);
  }

  let categoryData = (
    <Fragment>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.budget}>{budget}</Text>
    </Fragment>
  );

  if (isEdit) {
    categoryData = (
      <Fragment>
        <TextInput
          defaultValue={title}
          value={editedtitle}
          style={[styles.input, styles.categoryInput]}
          onChangeText={categoryInputChangeHandler}
        />
        <TextInput
          defaultValue={budget.toString()}
          value={editedBuget}
          style={[styles.input, styles.budgetInput]}
          keyboardType="decimal-pad"
          onChangeText={bugetInputChangeHandler}
        />
      </Fragment>
    );
  }
  return (
    <>
      <CategoryForm
        categoryData={categoryData}
        icon={isEdit ? "checkmark-circle-outline" : "create-outline"}
        iconColor={isEdit ? "green" : "black"}
        onEditPress={editCategoryHandler}
        onRemovePress={deleteButtonPressHandler}
        isedit={isEdit}
      />
      <CheckboxModal
        isVisable={isModalVisible}
        onDeleteOption={removeCategoryHandler}
        onClose={closeModelHandler}
      />
    </>

    // <View style={styles.container}>
    //   <View style={styles.items}>{categoryData}</View>
    //   <View style={styles.buttons}>
    //     <IconButton
    //       icon={isEdit ? "checkmark-circle-outline" : "create-outline"}
    //       size={24}
    //       color={isEdit ? "green" : "black"}
    //       onPress={editCategoryHandler}
    //     />
    //     <IconButton
    //       icon="remove-circle-outline"
    //       size={24}
    //       color="red"
    //       onPress={onRemove.bind(this, id)}
    //     />
    //   </View>
    // </View>
  );
};

export default CategoryItem;

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-around",
    flexDirection: "row",
  },
  items: {
    flex: 1,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: Colors.primary200,
    padding: 8,
    margin: 8,
    borderRadius: 6,
    justifyContent: "space-between",
    backgroundColor: Colors.primary100,
  },
  buttons: {
    flexDirection: "row",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.primary800,
    textAlign: "center",
  },
  budget: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.primary800,
    textAlign: "center",
  },
  input: {
    color: Colors.primary800,
    marginHorizontal: 6,
    borderRadius: 6,
    fontSize: 18,
    backgroundColor: Colors.primary200,
  },
  categoryInput: {
    flex: 2,
  },
  budgetInput: {
    flex: 1,
  },
});
