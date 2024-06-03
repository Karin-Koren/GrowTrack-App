import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import CategoriesScreen from "./screens/CategoriesScreen";
import { Colors } from "./constants/colors";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import CategoriesContextProvider from "./store/CategoriesContext";
import ExpensesContextProvider from "./store/ExpensesContext";
import ExpensesScreen from "./screens/ExpensesScreen";
import ManageExpenseScreen from "./screens/ManageExpenseScreen";
import IconButton from "./components/UI/IconButton";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.backround4 },
        sceneContainerStyle: { backgroundColor: Colors.backround },
        drawerContentStyle: { backgroundColor: Colors.backround3 },
        drawerActiveTintColor: Colors.primary600,
      }}
    >
      <Drawer.Screen
        name="Categories"
        component={CategoriesScreen}
        options={{
          title: "My Budget",
          drawerLabel: "My Budget",
        }}
      />
      <Drawer.Screen
        name="Expenses"
        component={ExpensesScreen}
        options={({ navigation }) => ({
          title: "My Expenses",
          headerRight: ({ tintColor }) => (
            <IconButton
              icon={"add"}
              color={tintColor}
              size={24}
              onPress={() => {
                navigation.navigate("ManageExpense");
              }}
            />
          ),
        })}
      />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <CategoriesContextProvider>
        <ExpensesContextProvider>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                headerStyle: { backgroundColor: Colors.backround4 },
                contentStyle: { backgroundColor: Colors.backround },
              }}
            >
              <Stack.Screen
                name="Drawer"
                component={DrawerNavigator}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="ManageExpense"
                component={ManageExpenseScreen}
                options={{
                  presentation: "modal",
                }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </ExpensesContextProvider>
      </CategoriesContextProvider>
    </>
  );
}

const styles = StyleSheet.create({});
