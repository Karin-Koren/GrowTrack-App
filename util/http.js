import axios from "axios";
import { Expense } from "../models/Expense";
import { Category } from "../models/Category";

const BACKEND_URL = "https://growtrackapp-default-rtdb.firebaseio.com/";

export async function storeData(type, data) {
  const response = await axios.post(BACKEND_URL + `/${type}.json`, data);
  const id = response.data.name;
  return id;
}

export async function fetchCategories() {
  const response = await axios.get(BACKEND_URL + "/categories.json");
  const categories = [];

  for (const key in response.data) {
    const category = new Category(
      key,
      response.data[key].title,
      response.data[key].budget,
      response.data[key].balance,
      response.data[key].available
    );
    categories.push(category);
  }
  return categories;
}

export async function fetchExpenses() {
  const response = await axios.get(BACKEND_URL + "/expenses.json");

  const expenses = [];

  for (const key in response.data) {
    const expense = new Expense(
      key,
      response.data[key].description,
      response.data[key].amount,
      new Date(response.data[key].date),
      response.data[key].category
    );
    expenses.push(expense);
  }
  return expenses;
}

export function updateData(type, id, data) {
  return axios.put(BACKEND_URL + `/${type}/${id}.json`, data);
}

export function deleteDate(type, id) {
  return axios.delete(BACKEND_URL + `/${type}/${id}.json`);
}
