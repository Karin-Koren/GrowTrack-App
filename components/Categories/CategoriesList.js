import {
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  View,
  ScrollView,
} from "react-native";
import { Colors } from "../../constants/colors";
import CategoryItem from "./CategoryItem";
import { Fragment, useContext, useEffect, useState } from "react";
import { CategoriesContext } from "../../store/CategoriesContext";
import { useNavigation } from "@react-navigation/native";
import IconButton from "../UI/IconButton";
import CategoryForm from "./CategoryForm";
import { Category } from "../../models/Category";
import { storeData, updateData } from "../../util/http";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { KeyboardAwareFlatList } from "react-native-keyboard-aware-scroll-view";

const CategoriesList = () => {
  const categoriesCtx = useContext(CategoriesContext);

  const [addMode, setAddMode] = useState(false);
  const [addedtitle, setAddedtitle] = useState("");
  const [addedBuget, setAddedBuget] = useState("");

  const navigation = useNavigation();

  const addCategoryData = (
    <Fragment>
      {/* <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      > */}

      <TextInput
        placeholder="Category"
        style={[styles.input, styles.categoryInput]}
        onChangeText={categoryInputChangeHandler}
        value={addedtitle}
      />
      <TextInput
        placeholder="Budget"
        value={addedBuget}
        style={[styles.input, styles.budgetInput]}
        keyboardType="decimal-pad"
        onChangeText={bugetInputChangeHandler}
      />
      {/* </KeyboardAvoidingView> */}
    </Fragment>
  );

  function addButtonPressHandler() {
    setAddMode(true);
    setAddedBuget("");
    setAddedtitle("");
  }

  function categoryInputChangeHandler(enteredText) {
    setAddedtitle(enteredText);
  }

  function bugetInputChangeHandler(enteredText) {
    setAddedBuget(enteredText);
  }

  async function addNewCategoryHandler() {
    if (isNaN(addedBuget) || +addedBuget < 0) {
      //Validating an new budget
      Alert.alert("Invalid Data", "Please insert valid data!");
      setAddedBuget("");
      return;
    }
    if (addedtitle.trim().length < 1) {
      //Validating an updated title
      Alert.alert("Empty Category", "Cant insert a empty category!");
      return;
    }
    try {
      const category = {
        title: addedtitle.trim(),
        budget: addedBuget,
        balance: addedBuget,
        available: true,
      };

      const oldCategory = categoriesCtx.categories.find(
        (category) => category.title === addedtitle
      );
      if (oldCategory) {
        if (oldCategory.available) {
          Alert.alert(
            "Category Already Exists",
            `The category "${addedtitle}" already exists.`
          );
          return;
        } else {
          setAddMode(false);
          categoriesCtx.editCategory(oldCategory.id, category);
          await updateData("categories", oldCategory.id, category);
        }
      } else {
        const id = await storeData("categories", category);
        const newCategory = new Category(
          id,
          category.title,
          category.budget,
          category.balance,
          category.available
        );
        categoriesCtx.addCategory(newCategory);
      }
    } catch (error) {
      console.log(error);
    }
    setAddMode(false);
  }

  function cencleAddNewCategoryHandler() {
    setAddedBuget("");
    setAddedtitle("");
    setAddMode(false);
  }

  useEffect(() => {
    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <IconButton
          icon={"add-circle-outline"}
          color={tintColor}
          size={24}
          onPress={addButtonPressHandler}
        />
      ),
    });
  }, [navigation]);

  function renderItemHendler(itemData) {
    return <CategoryItem {...itemData.item} />;
  }

  const availableCategories = categoriesCtx.categories.filter(
    (category) => category.available
  );
  return (
    <View>
      {addMode && (
        <CategoryForm
          categoryData={addCategoryData}
          icon="checkmark-circle-outline"
          iconColor="green"
          onEditPress={addNewCategoryHandler}
          onRemovePress={cencleAddNewCategoryHandler}
        />
      )}
      <FlatList //KeyboardAwareFlatList
        data={availableCategories}
        keyExtractor={(item) => item.id}
        renderItem={renderItemHendler}
        keyboardDismissMode="on-drag"
      />
    </View>
  );
};

export default CategoriesList;

const styles = StyleSheet.create({
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
  input: {
    flex: 1,
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
