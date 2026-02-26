import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Linking,
} from "react-native";
import AppBar from "../components/AppBar";
import { useNavigation } from "@react-navigation/native";
import { useCart, Product } from "../context/CartContext";
import { getAuth, User } from "firebase/auth";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../config/firebase";

export default function CartScreen() {
  const navigation: any = useNavigation();
  const { cart, addToCart, removeFromCart, clearCart } = useCart();
  const auth = getAuth();
  const currentUser: User | null = auth.currentUser;
  const [loading, setLoading] = useState(false);

  // Format total in Rands
  const formatRands = (amount: number) =>
    new Intl.NumberFormat("en-ZA", { style: "currency", currency: "ZAR" }).format(amount);

  const totalPrice = cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);

  // Update quantity
  const handleQuantityChange = (index: number, delta: number) => {
    const updatedCart = [...cart];
    const item = updatedCart[index];
    const newQty = (item.quantity || 1) + delta;
    if (newQty < 1) return;
    updatedCart[index] = { ...item, quantity: newQty };

    // Clear cart and re-add updated items
    clearCart();
    updatedCart.forEach((p) => addToCart(p));
  };

  // Checkout
  const handleCheckout = async () => {
  if (!currentUser) {
    Alert.alert("Not logged in", "Please login to place an order.");
    navigation.replace("Login");
    return;
  }
  if (cart.length === 0) {
    Alert.alert("Cart Empty", "Please add some products before checkout.");
    return;
  }

  setLoading(true);
  try {
    // 1️⃣ Store order in Firestore
    const ordersRef = collection(db, "orders");
    const orderData = {
      userId: currentUser.uid,
      items: cart.map((item) => ({
        name: item.name,
        price: item.price,
        quantity: item.quantity || 1,
      })),
      total: totalPrice,
      createdAt: serverTimestamp(),
    };
    const orderDoc = await addDoc(ordersRef, orderData);

    // 2️⃣ WhatsApp message
    const messageBody = cart
      .map(
        (item) =>
          `${item.name} - ${item.quantity || 1} x R${item.price} = R${
            (item.quantity || 1) * item.price
          }`
      )
      .join("\n");

    const whatsappMessage = `Hello, I want to order:\n${messageBody}\n\nTotal: ${formatRands(
      totalPrice
    )}`;
    const phoneNumber = "27600000000"; // Replace with your number
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;
    const supported = await Linking.canOpenURL(url);
    if (supported) await Linking.openURL(url);
    else Alert.alert("WhatsApp Not Available", "Cannot open WhatsApp on this device.");

    // 3️⃣ Clear cart and navigate
    clearCart();
    Alert.alert("Order Placed", "Your order was successfully created.");
    navigation.navigate("Orders");
  } catch (error: any) {
    console.error("Checkout error:", error);
    Alert.alert("Error", error.message || "Something went wrong.");
  } finally {
    setLoading(false);
  }
};

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <AppBar title="Cart" onMenuPress={() => navigation.openDrawer()} />

      {loading ? (
        <ActivityIndicator size="large" color="#d41ed3" style={{ marginTop: 50 }} />
      ) : cart.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Your cart is empty!</Text>
        </View>
      ) : (
        <>
          <ScrollView contentContainerStyle={styles.container}>
            {cart.map((item, index) => (
              <View key={index} style={styles.card}>
                <Image source={item.img} style={styles.image} />
                <View style={{ flex: 1, marginLeft: 12 }}>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.price}>{formatRands(item.price)}</Text>

                  {/* Quantity controls */}
                  <View style={styles.quantityRow}>
                    <TouchableOpacity
                      style={styles.qtyButton}
                      onPress={() => handleQuantityChange(index, -1)}
                    >
                      <Text style={styles.qtyText}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.qtyNumber}>{item.quantity || 1}</Text>
                    <TouchableOpacity
                      style={styles.qtyButton}
                      onPress={() => handleQuantityChange(index, 1)}
                    >
                      <Text style={styles.qtyText}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <TouchableOpacity style={styles.removeButton} onPress={() => removeFromCart(index)}>
                  <Text style={styles.removeText}>Remove</Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>

          <View style={styles.checkoutContainer}>
            <Text style={styles.totalText}>Total: {formatRands(totalPrice)}</Text>
            <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
              <Text style={styles.checkoutButtonText}>Place Order</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, paddingBottom: 120 },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 12,
    marginBottom: 16,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    alignItems: "center",
  },
  image: { width: 80, height: 80, borderRadius: 12 },
  name: { fontSize: 16, fontWeight: "bold", marginBottom: 4 },
  price: { color: "#d41ed3", fontWeight: "bold" },
  removeButton: { paddingHorizontal: 10, paddingVertical: 6, backgroundColor: "#ff4d4d", borderRadius: 12 },
  removeText: { color: "#fff", fontWeight: "bold" },
  checkoutContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "#fff",
    padding: 16,
    borderTopWidth: 1,
    borderColor: "#ccc",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  totalText: { fontSize: 18, fontWeight: "bold", color: "#010a33" },
  checkoutButton: { backgroundColor: "#d41ed3", paddingVertical: 10, paddingHorizontal: 24, borderRadius: 24 },
  checkoutButtonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  emptyContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  emptyText: { fontSize: 20, color: "#010a33" },
  quantityRow: { flexDirection: "row", alignItems: "center", marginTop: 6 },
  qtyButton: { backgroundColor: "#d41ed3", padding: 6, borderRadius: 8 },
  qtyText: { color: "#fff", fontWeight: "bold", fontSize: 16, width: 20, textAlign: "center" },
  qtyNumber: { marginHorizontal: 12, fontSize: 16, fontWeight: "bold" },
});