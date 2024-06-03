import { createContext, useReducer } from "react";
import { Category } from "../models/Category";

const CATEGORIES = [
  new Category("food", 200),
  new Category("shop", 300),
  new Category("dog", 400),
];

export const CategoriesContext = createContext({
  categories: [],
  setCategories: (categories) => {},
  addCategory: (category) => {},
  removeCategory: (id) => {},
  editCategory: (id, newCategory) => {},
});

function categotiesReducer(state, action) {
  switch (action.type) {
    case "SET":
      return action.data;
    case "ADD":
      return [...state, action.data];
    case "REMOVE":
      return state.filter((category) => category.id !== action.data);
    case "EDIT":
      const categoryIndex = state.findIndex(
        (category) => category.id === action.data.id
      );
      const updateableCategory = state[categoryIndex];
      const categoryData = action.data.categoryData;
      const updateItem = new Category(
        updateableCategory.id,
        categoryData.title,
        categoryData.budget,
        categoryData.balance,
        categoryData.available
      );

      const copyCategories = [...state];
      copyCategories[categoryIndex] = updateItem;
      return copyCategories;

    default:
      return state;
  }
}

function CategoriesContextProvider({ children }) {
  const [categoriesState, dispatch] = useReducer(categotiesReducer, []);

  function setCategories(categories) {
    dispatch({ type: "SET", data: categories });
  }
  function addCategory(categoryData) {
    dispatch({ type: "ADD", data: categoryData });
  }

  function removeCategory(categoryId) {
    dispatch({ type: "REMOVE", data: categoryId });
  }

  function editCategory(categoryId, categoryData) {
    dispatch({
      type: "EDIT",
      data: { id: categoryId, categoryData: categoryData },
    });
  }

  const value = {
    categories: categoriesState,
    setCategories: setCategories,
    addCategory: addCategory,
    removeCategory: removeCategory,
    editCategory: editCategory,
  };

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
}

export default CategoriesContextProvider;
