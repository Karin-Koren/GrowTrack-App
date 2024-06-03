import { FlatList, StyleSheet, Text, View } from "react-native";
import { useContext } from "react";
import { CategoriesContext } from "../../store/CategoriesContext";
import BalanceItem from "./BalanceItem";

const BalanceList = ({ expenses }) => {
  const categoriesCtx = useContext(CategoriesContext);

  const expensesByCategory = expenses.reduce((acc, expense) => {
    const { categoryTitle, amount } = expense;
    const existingCategory = acc.find(
      (item) => item.categoryTitle === categoryTitle
    );
    // console.log("category.title: ", categoryTitle);
    const category = categoriesCtx.categories.find(
      (category) => category.title === categoryTitle
    );
    if (!category) {
      return acc;
    }
    //console.log("category.budget: ", category);
    if (!existingCategory) {
      acc.push({
        categoryTitle,
        totalAmount: +amount,
        budget: category.budget,
      });
    } else {
      existingCategory.totalAmount += +amount;
    }
    // category.balance -= +amount;

    return acc;
  }, []);

  function renderBalanceItem(itemData) {
    return <BalanceItem {...itemData.item} />;
  }

  return (
    <View>
      <FlatList
        data={expensesByCategory}
        // keyExtractor={(item) => item.categoryTitle}
        renderItem={renderBalanceItem}
        horizontal={true}
      />
    </View>
  );
};

export default BalanceList;

const styles = StyleSheet.create({});
