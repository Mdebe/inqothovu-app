import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import HomeScreen from "../screens/HomeScreen";
import ProductsScreen from "../screens/ProductsScreen";
import BulkScreen from "../screens/BulkScreen";
import ProfileScreen from "../screens/ProfileScreen";
import CartScreen from "../screens/CartScreen";

import { useCart } from "../context/CartContext";

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  const { cart } = useCart();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#d41ed3",
        tabBarInactiveTintColor: "#a0a9a6",
        tabBarStyle: { height: 70, paddingBottom: 8 },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = "home";

          if (route.name === "Home") iconName = focused ? "home" : "home-outline";
          if (route.name === "Products") iconName = focused ? "pricetag" : "pricetag-outline";
          if (route.name === "Bulk") iconName = focused ? "cube" : "cube-outline";
          if (route.name === "Profile") iconName = focused ? "person" : "person-outline";

          return (
            <Ionicons name={iconName as any} size={size} color={color} />
          );
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Products" component={ProductsScreen} />
      <Tab.Screen name="Bulk" component={BulkScreen} />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarBadge: cart.length > 0 ? cart.length : undefined,
          tabBarBadgeStyle: { backgroundColor: "#d41ed3", color: "#fff" },
        }}
      />
    </Tab.Navigator>
  );
}