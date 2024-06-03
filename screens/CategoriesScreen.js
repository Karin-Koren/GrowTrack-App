import { StyleSheet, Text, View } from "react-native";
import CategoriesList from "../components/Categories/CategoriesList";
import { useContext, useEffect, useState } from "react";
import { fetchCategories } from "../util/http";
import { CategoriesContext } from "../store/CategoriesContext";
import LoadingOverlay from "../components/UI/LoadingOverlay";

const CategoriesScreen = () => {
  const categoriesCtx = useContext(CategoriesContext);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    async function getCategories() {
      setIsFetching(true);
      try {
        const categories = await fetchCategories();
        console.log("");
        console.log(categories);
        categoriesCtx.setCategories(categories);
      } catch (error) {
        console.log("could not fetch categories!");
        console.log(error);
      }
      setIsFetching(false);
    }

    getCategories();
  }, []);

  if (isFetching) {
    return <LoadingOverlay />;
  }

  return (
    <View style={styles.constainer}>
      <CategoriesList />
    </View>
  );
};

export default CategoriesScreen;

const styles = StyleSheet.create({
  constainer: {
    flex: 1,
  },
});
