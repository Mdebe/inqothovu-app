import React, { useState, useRef, useEffect } from "react";
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
  Animated,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import AppBar from "../components/AppBar";
import { useNavigation } from "@react-navigation/native";
import { useCart, Product } from "../context/CartContext";

const { width } = Dimensions.get("window");
const HERO_HEIGHT = 230;
const SPECIAL_HEIGHT = 160;

// Hero slider images
const heroImages = [
  { img: require("../../assets/images/hero4.jpg"), title: "Luxury Fragrances", subtitle: "Smell premium. Feel confident.", sale: false },
  { img: require("../../assets/images/hero3.jpg"), title: "Limited Sale", subtitle: "Up to 30% OFF selected perfumes", sale: true },
  { img: require("../../assets/images/hero2.jpg"), title: "Luxury Perfumes", subtitle: "Up to 20% OFF selected perfumes", sale: true },
];

// Specials banner images
const specialsSlides = [
  { img: require("../../assets/images/hero3.jpg"), title: "Weekend Special", subtitle: "Up to 50% OFF" },
  { img: require("../../assets/images/hero2.jpg"), title: "Flash Sale", subtitle: "Limited Time 50% OFF" },
];

// Categories
const categories = [
  { name: "Car Diffusers", img: require("../../assets/images/car.jpg") },
  { name: "House Diffusers", img: require("../../assets/images/house.png") },
  { name: "Roll-Ons", img: require("../../assets/images/p1.png") },
  { name: "Perfumes", img: require("../../assets/images/pe1.png") },
];

// Products
const products: Product[] = [
  { id: "car-001", name: "Car Diffuser", price: 50, img: require("../../assets/images/car.jpg"), quantity: 1, category: "Car Diffusers" },
  { id: "house-001", name: "House Diffuser", price: 200, img: require("../../assets/images/house.png"), quantity: 1, category: "House Diffusers" },
  { id: "rollon-001", name: "Roll-On Perfume", price: 30, img: require("../../assets/images/p1.png"), quantity: 1, category: "Roll-Ons" },
  { id: "luxury-001", name: "Luxury Perfume", price: 100, img: require("../../assets/images/pe1.png"), quantity: 1, category: "Perfumes" },
];

export default function HomeScreen() {
  const navigation: any = useNavigation();
  const { addToCart } = useCart();
  const [search, setSearch] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [specialIndex, setSpecialIndex] = useState(0);

  const fadeAnim = useRef(new Animated.Value(1)).current;
  const specialFade = useRef(new Animated.Value(1)).current;
  const scrollY = useRef(new Animated.Value(0)).current;

  // Hero fade animation
  useEffect(() => {
    const interval = setInterval(() => {
      Animated.sequence([
        Animated.timing(fadeAnim, { toValue: 0, duration: 500, useNativeDriver: true }),
        Animated.timing(fadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
      ]).start();
      setCurrentIndex(prev => (prev === heroImages.length - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Specials fade animation
  useEffect(() => {
    const interval = setInterval(() => {
      Animated.sequence([
        Animated.timing(specialFade, { toValue: 0, duration: 400, useNativeDriver: true }),
        Animated.timing(specialFade, { toValue: 1, duration: 400, useNativeDriver: true }),
      ]).start();
      setSpecialIndex(prev => (prev === specialsSlides.length - 1 ? 0 : prev + 1));
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const handleAddToCart = (item: Product) => {
    addToCart(item);
    if (Platform.OS === "android") {
      ToastAndroid.show(`${item.name} added to cart!`, ToastAndroid.SHORT);
    } else {
      Alert.alert("Added to Cart", `${item.name} has been added.`);
    }
  };

  const parallax = scrollY.interpolate({ inputRange: [0, HERO_HEIGHT], outputRange: [0, -50], extrapolate: "clamp" });

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <AppBar title="Inqothovu" onMenuPress={() => navigation.openDrawer()} />

      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: true })}
        scrollEventThrottle={16}
      >
        {/* Search */}
        <View style={styles.searchContainer}>
          <TextInput placeholder="Search fragrances..." value={search} onChangeText={setSearch} style={styles.searchInput} />
        </View>

        {/* Hero Slider */}
        <Animated.View style={[styles.heroCard, { transform: [{ translateY: parallax }] }]}>
          <Animated.Image source={heroImages[currentIndex].img} style={[styles.heroImage, { opacity: fadeAnim }]} />
          <LinearGradient colors={["transparent", "rgba(0,0,0,0.7)"]} style={styles.gradient} />
          {heroImages[currentIndex].sale && (
            <View style={styles.saleBadge}>
              <Text style={styles.saleText}>ON SALE</Text>
            </View>
          )}
          <View style={styles.heroTextContainer}>
            <Text style={styles.heroTitle}>{heroImages[currentIndex].title}</Text>
            <Text style={styles.heroSubtitle}>{heroImages[currentIndex].subtitle}</Text>
            <TouchableOpacity style={styles.shopButton} onPress={() => navigation.navigate("Shop")}>
              <Text style={styles.shopButtonText}>Shop Now</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>

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

        {/* Featured Products with gradient background */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Featured Products</Text>
          <View style={styles.productGrid}>
            {products.map((item, index) => (
              <TouchableOpacity key={index} style={styles.productCard} onPress={() => handleAddToCart(item)}>
                {/* Gradient Background */}
                <LinearGradient
                  colors={["#f0e5ff", "#e0c3fc"]}
                  style={styles.productGradient}
                />
                <Image source={item.img} style={styles.productImage} />
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.productPrice}>R {item.price}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Specials Banner */}
        <View style={styles.specialContainer}>
          <Animated.Image source={specialsSlides[specialIndex].img} style={[styles.specialImage, { opacity: specialFade }]} />
          <LinearGradient colors={["transparent", "rgba(0,0,0,0.75)"]} style={StyleSheet.absoluteFillObject} />
          <View style={styles.specialBadge}>
            <Text style={styles.specialBadgeText}>50% OFF</Text>
          </View>
          <View style={styles.specialTextContainer}>
            <Text style={styles.specialTitle}>{specialsSlides[specialIndex].title}</Text>
            <Text style={styles.specialSubtitle}>{specialsSlides[specialIndex].subtitle}</Text>
            <TouchableOpacity style={styles.specialButton} onPress={() => navigation.navigate("Shop")}>
              <Text style={styles.specialButtonText}>View Specials</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ height: 50 }} />
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: { padding: 16 },
  searchInput: { backgroundColor: "#f2f2f2", padding: 14, borderRadius: 14, fontSize: 16 },

  heroCard: { width: width - 32, height: HERO_HEIGHT, marginHorizontal: 16, borderRadius: 24, overflow: "hidden", marginBottom: 20, elevation: 6 },
  heroImage: { width: "100%", height: "100%", position: "absolute" },
  gradient: { ...StyleSheet.absoluteFillObject },
  heroTextContainer: { position: "absolute", bottom: 20, left: 20 },
  heroTitle: { color: "#fff", fontSize: 22, fontWeight: "bold" },
  heroSubtitle: { color: "#fff", marginTop: 4, marginBottom: 12 },
  shopButton: { backgroundColor: "#d41ed3", paddingHorizontal: 20, paddingVertical: 8, borderRadius: 20 },
  shopButtonText: { color: "#fff", fontWeight: "bold" },
  saleBadge: { position: "absolute", top: 15, right: 15, backgroundColor: "red", paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  saleText: { color: "#fff", fontWeight: "bold", fontSize: 12 },

  section: { padding: 16 },
  sectionTitle: { fontSize: 22, fontWeight: "bold", color: "#d41ed3", marginBottom: 12 },

  categoryCard: { marginRight: 14, alignItems: "center" },
  categoryImage: { width: 100, height: 100, borderRadius: 20 },
  categoryText: { marginTop: 6, fontWeight: "600" },

  productGrid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },
  productCard: { width: "48%", borderRadius: 16, marginBottom: 16, padding: 10, elevation: 4, overflow: "hidden" },
  productGradient: { ...StyleSheet.absoluteFillObject, borderRadius: 16 }, // gradient overlay
  productImage: { width: "100%", height: 120, borderRadius: 12 },
  productName: { fontWeight: "bold", marginTop: 8 },
  productPrice: { color: "#d41ed3", fontWeight: "bold", marginTop: 4 },

  // Specials Banner
  specialContainer: { height: SPECIAL_HEIGHT, marginHorizontal: 16, marginBottom: 20, borderRadius: 22, overflow: "hidden", elevation: 6 },
  specialImage: { width: "100%", height: "100%", position: "absolute" },
  specialBadge: { position: "absolute", top: 12, right: 12, backgroundColor: "#ff0000", paddingHorizontal: 14, paddingVertical: 6, borderRadius: 20 },
  specialBadgeText: { color: "#fff", fontWeight: "bold", fontSize: 12 },
  specialTextContainer: { position: "absolute", bottom: 16, left: 16 },
  specialTitle: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  specialSubtitle: { color: "#fff", marginTop: 4, marginBottom: 10 },
  specialButton: { backgroundColor: "#d41ed3", paddingHorizontal: 18, paddingVertical: 6, borderRadius: 20 },
  specialButtonText: { color: "#fff", fontWeight: "bold" },
});