import React from "react";
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet } from "react-native";
import AppBar from "../components/AppBar";
import { useNavigation } from "@react-navigation/native";
import { useCart, Product } from "../context/CartContext";

// Each product now starts with quantity = 1
const products: Product[] = [
  { name: "Car Diffuser", price: 50, img: require("../../assets/images/hero.jpg"), quantity: 1 },
  { name: "House Diffuser", price: 200, img: require("../../assets/images/hero.jpg"), quantity: 1 },
  { name: "Roll-on Perfume", price: 30, img: require("../../assets/images/hero.jpg"), quantity: 1 },
  { name: "Luxury Perfume", price: 100, img: require("../../assets/images/hero.jpg"), quantity: 1 },
];

export default function ProductsScreen() {
  const navigation: any = useNavigation();
  const { addToCart } = useCart();

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <AppBar title="Products" onMenuPress={() => navigation.openDrawer()} />

      <ScrollView contentContainerStyle={styles.container}>
        {products.map((item, index) => (
          <View key={index} style={styles.card}>
            <Image source={item.img} style={styles.image} />
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.price}>R {item.price}</Text>

            <TouchableOpacity
              style={styles.button}
              onPress={() => addToCart(item)}
            >
              <Text style={styles.buttonText}>Add to Cart</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 16,
    marginBottom: 16,
    padding: 10,
    elevation: 5,
  },
  image: {
    width: "100%",
    height: 120,
    borderRadius: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 8,
  },
  price: {
    color: "#d41ed3",
    fontWeight: "bold",
    marginVertical: 4,
  },
  button: {
    backgroundColor: "#d41ed3",
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: 6,
  },
  buttonText: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
  },
});