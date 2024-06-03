import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Colors } from "../../constants/colors";
import IconButton from "../UI/IconButton";
import { ScrollView } from "react-native-gesture-handler";

const CategoryForm = ({
  categoryData,
  icon,
  iconColor,
  onEditPress,
  onRemovePress,
  isedit,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.items}>{categoryData}</View>
      <View style={styles.buttons}>
        <IconButton
          icon={icon}
          size={24}
          color={iconColor}
          onPress={onEditPress}
        />
        {!isedit && (
          <IconButton
            icon="remove-circle-outline"
            size={24}
            color="red"
            onPress={onRemovePress}
          />
        )}
      </View>
    </View>
  );
};

export default CategoryForm;

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
