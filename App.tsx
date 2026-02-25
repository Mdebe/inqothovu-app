import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { CartProvider } from "./src/context/CartContext";

// Screens
import SplashScreen from "./src/screens/SplashScreen";
import LoginScreen from "./src/screens/LoginScreen";
import SignupScreen from "./src/screens/SignupScreen";
import CartScreen from "./src/screens/CartScreen";
import OrdersScreen from "./src/screens/OrdersScreen";
import ContactScreen from "./src/screens/ContactScreen";
import SettingsScreen from "./src/screens/SettingsScreen";

// Navigation
import BottomTabs from "./src/navigation/BottomTabs";
import CustomDrawer from "./src/components/CustomDrawer";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerStack() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: "#d41ed3",
        drawerInactiveTintColor: "#010a33",
      }}
    >
      {/* Main shop tabs */}
      <Drawer.Screen name="Shop" component={BottomTabs} />
      <Drawer.Screen name="Cart" component={CartScreen} />
      <Drawer.Screen name="Orders" component={OrdersScreen} />
      <Drawer.Screen name="Contact" component={ContactScreen} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <CartProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            {/* Splash → Login → Signup → DrawerStack */}
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
            <Stack.Screen name="HomeDrawer" component={DrawerStack} />
          </Stack.Navigator>
        </NavigationContainer>
      </CartProvider>
    </GestureHandlerRootView>
  );
}