import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  Platform,
  ToastAndroid,
  Alert,
} from "react-native";
import AppBar from "../components/AppBar";
import { useNavigation } from "@react-navigation/native";
import { useCart, Product } from "../context/CartContext";

const { width } = Dimensions.get("window");

const categories = [
  { name: "Car Diffusers", img: require("../../assets/images/hero.jpg") },
  { name: "House Diffusers", img: require("../../assets/images/hero.jpg") },
  { name: "Roll-Ons", img: require("../../assets/images/hero.jpg") },
  { name: "Perfumes", img: require("../../assets/images/hero.jpg") },
];

const products: Product[] = [
  {
      name: "Car Diffuser", price: 50, img: require("../../assets/images/hero.jpg"),
      quantity: 1
  },
  {
      name: "House Diffuser", price: 200, img: require("../../assets/images/hero.jpg"),
      quantity: 1
  },
  {
      name: "Roll-On Perfume", price: 30, img: require("../../assets/images/hero.jpg"),
      quantity: 1
  },
  {
      name: "Luxury Perfume", price: 100, img: require("../../assets/images/hero.jpg"),
      quantity: 1
  },
];

export default function HomeScreen() {
  const navigation: any = useNavigation();
  const { addToCart } = useCart();
  const [search, setSearch] = useState("");

  const handleAddToCart = (item: Product) => {
    addToCart(item);

    if (Platform.OS === "android") {
      ToastAndroid.show(`${item.name} added to cart!`, ToastAndroid.SHORT);
    } else {
      Alert.alert("Added to Cart", `${item.name} has been added to your cart.`);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      
      {/* App Bar */}
      <AppBar
        title="Inqothovu"
        onMenuPress={() => navigation.openDrawer()}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <TextInput
            placeholder="Search fragrances..."
            value={search}
            onChangeText={setSearch}
            style={styles.searchInput}
          />
        </View>

        {/* Hero Section */}
        <View style={styles.heroContainer}>
          <Image
            source={require("../../assets/images/logo.png")}
            style={styles.heroImage}
          />
        </View>

        {/* Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Shop by Category</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {categories.map((item, index) => (
              <TouchableOpacity key={index} style={styles.categoryCard}>
                <Image source={item.img} style={styles.categoryImage} />
                <Text style={styles.categoryText}>{item.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Featured Products */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Featured Products</Text>
          <View style={styles.productGrid}>
            {products.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.productCard}
                onPress={() => handleAddToCart(item)}
              >
                <Image source={item.img} style={styles.productImage} />
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.productPrice}>R {item.price}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Promo Banner */}
        <View style={styles.promoBanner}>
          <Text style={styles.promoText}>Buy in Bulk & Save More 💜</Text>
          <TouchableOpacity
            style={styles.promoButton}
            onPress={() => navigation.navigate("Bulk")}
          >
            <Text style={styles.promoButtonText}>Order in Bulk</Text>
          </TouchableOpacity>
        </View>

        {/* Why Choose Us */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Why Choose Us</Text>
          <View style={styles.featuresContainer}>
            <View style={styles.featureBox}>
              <Text style={styles.featureTitle}>Premium Quality</Text>
              <Text style={styles.featureText}>Long-lasting fragrances.</Text>
            </View>
            <View style={styles.featureBox}>
              <Text style={styles.featureTitle}>Affordable Prices</Text>
              <Text style={styles.featureText}>Retail & wholesale options.</Text>
            </View>
            <View style={styles.featureBox}>
              <Text style={styles.featureTitle}>Fast Service</Text>
              <Text style={styles.featureText}>Quick response & delivery.</Text>
            </View>
          </View>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: { padding: 16 },
  searchInput: { backgroundColor: "#f2f2f2", padding: 14, borderRadius: 14, fontSize: 16 },
  heroContainer: { width: width, height: 220, position: "relative" },
  heroImage: { width: "100%", height: "100%" },
  section: { padding: 16 },
  sectionTitle: { fontSize: 22, fontWeight: "bold", color: "#d41ed3", marginBottom: 12 },
  categoryCard: { marginRight: 14, alignItems: "center" },
  categoryImage: { width: 100, height: 100, borderRadius: 20 },
  categoryText: { marginTop: 6, fontWeight: "600" },
  productGrid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },
  productCard: { width: "48%", backgroundColor: "#fff", borderRadius: 16, marginBottom: 16, padding: 10, elevation: 4 },
  productImage: { width: "100%", height: 120, borderRadius: 12 },
  productName: { fontWeight: "bold", marginTop: 8 },
  productPrice: { color: "#d41ed3", fontWeight: "bold", marginTop: 4 },
  promoBanner: { backgroundColor: "#d41ed3", padding: 20, margin: 16, borderRadius: 20, alignItems: "center" },
  promoText: { color: "#fff", fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  promoButton: { backgroundColor: "#fff", paddingHorizontal: 20, paddingVertical: 10, borderRadius: 20 },
  promoButtonText: { color: "#d41ed3", fontWeight: "bold" },
  featuresContainer: { flexDirection: "row", justifyContent: "space-between" },
  featureBox: { width: "30%", backgroundColor: "#f7f7f7", padding: 10, borderRadius: 12 },
  featureTitle: { fontWeight: "bold", marginBottom: 4 },
  featureText: { fontSize: 12, color: "#555" },
});