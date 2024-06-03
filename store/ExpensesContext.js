import { createContext, useReducer } from "react";
import { Expense } from "../models/Expense";

export const EXPENSES = [
  new Expense("sort", 100, new Date("2020-12-12"), "shop"),
  new Expense("food for punch", 50, new Date("2023-11-11"), "dog"),
];

export const ExpensesContext = createContext({
  expenses: [],
  setExpenses: (expenses) => {},
  addExpense: ({ newExpense }) => {},
  deleteExpense: (expenseId) => {},
  updateExpense: (id, { updateExpense }) => {},
});

function expensesReducre(state, action) {
  switch (action.type) {
    case "SET":
      return action.payload.reverse();
    case "ADD":
      return [action.payload, ...state];
    case "DELETE":
      return state.filter((expense) => expense.id !== action.payload);
    case "UPDATE":
      const updateableExpenseIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      );
      const updateableExpense = state[updateableExpenseIndex];
      const updateItem = { ...updateableExpense, ...action.payload.data };
      const updatedExpenses = [...state];
      updatedExpenses[updateableExpenseIndex] = updateItem;
      return updatedExpenses;
    default:
      return state;
  }
}

function ExpensesContextProvider({ children }) {
  const [expensesState, dispatch] = useReducer(expensesReducre, []);

  function setExpenses(expenses) {
    dispatch({ type: "SET", payload: expenses });
  }

  function addExpense(expenseData) {
    dispatch({ type: "ADD", payload: expenseData });
  }

  function deleteExpense(expenseId) {
    dispatch({ type: "DELETE", payload: expenseId });
  }

  function updateExpense(id, expenseData) {
    dispatch({ type: "UPDATE", payload: { id: id, data: expenseData } });
  }

  const value = {
    expenses: expensesState,
    setExpenses: setExpenses,
    addExpense: addExpense,
    deleteExpense: deleteExpense,
    updateExpense: updateExpense,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}

export default ExpensesContextProvider;
