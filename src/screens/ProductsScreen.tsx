import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import AppBar from "../components/AppBar";
import { useNavigation } from "@react-navigation/native";
import { useCart, Product } from "../context/CartContext";

const { width } = Dimensions.get("window");

// Categories
const categories = [
  "All",
  "Car Diffusers",
  "House Diffusers",
  "Roll-Ons",
  "Perfumes",
];

// Products
const products: Product[] = [
  {
    id: "car-001",
    name: "Car Diffuser",
    price: 50,
    img: require("../../assets/images/car.jpg"),
    quantity: 1,
    category: "Car Diffusers",
  },
  {
    id: "house-001",
    name: "House Diffuser",
    price: 200,
    img: require("../../assets/images/house.png"),
    quantity: 1,
    category: "House Diffusers",
  },
  {
    id: "rollon-001",
    name: "Roll-On Perfume",
    price: 30,
    img: require("../../assets/images/p1.png"),
    quantity: 1,
    category: "Roll-Ons",
  },
  {
    id: "luxury-001",
    name: "Luxury Perfume",
    price: 100,
    img: require("../../assets/images/pe1.png"),
    quantity: 1,
    category: "Perfumes",
  },
];

export default function ProductsScreen() {
  const navigation: any = useNavigation();
  const { addToCart } = useCart();
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProducts =
    activeCategory === "All"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <AppBar title="Products" onMenuPress={() => navigation.openDrawer()} />

      {/* CATEGORY TABS */}
      <View style={styles.categoryWrapper}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {categories.map((cat, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.categoryTab,
                activeCategory === cat && styles.activeCategory,
              ]}
              onPress={() => setActiveCategory(cat)}
            >
              <Text
                style={[
                  styles.categoryText,
                  activeCategory === cat && styles.activeCategoryText,
                ]}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* PRODUCTS GRID */}
      <ScrollView contentContainerStyle={styles.container}>
        {filteredProducts.map((item, index) => (
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

        {filteredProducts.length === 0 && (
          <Text style={{ marginTop: 40, textAlign: "center" }}>
            No products found.
          </Text>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  categoryWrapper: {
    paddingVertical: 10,
    paddingLeft: 16,
  },

  categoryTab: {
    backgroundColor: "#f2f2f2",
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
  },

  activeCategory: {
    backgroundColor: "#d41ed3",
  },

  categoryText: {
    fontWeight: "600",
    color: "#333",
  },

  activeCategoryText: {
    color: "#fff",
  },

  container: {
    padding: 16,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  card: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 18,
    marginBottom: 18,
    padding: 10,
    elevation: 5,
  },

  image: {
    width: "100%",
    height: 130,
    borderRadius: 14,
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