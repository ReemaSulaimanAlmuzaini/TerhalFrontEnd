
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "./(tabs)/auth/login";
import SignupScreen from "./(tabs)/auth/signup";
import Tabs from "./main";

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (

    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Main" component={Tabs} />

    </Stack.Navigator>

  );
}