import React from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  Linking,
  Alert,
} from "react-native";
import AppBar from "../components/AppBar";
import { useNavigation } from "@react-navigation/native";
import { useCart } from "../context/CartContext";

export default function CartScreen() {
  const navigation: any = useNavigation();
  const { cart, removeFromCart, clearCart, totalPrice } = useCart();

  const handleCheckout = () => {
    if (cart.length === 0) {
      Alert.alert("Cart Empty", "Please add some products before checkout.");
      return;
    }

    // Create WhatsApp message with cart items
    const message = cart
      .map((item) => `${item.name} - R${item.price}`)
      .join("\n");
    const whatsappMessage = `Hello, I want to order:\n${message}\n\nTotal: R${totalPrice}`;
    const whatsappURL = `https://wa.me/27600000000?text=${encodeURIComponent(
      whatsappMessage
    )}`; // Replace 27600000000 with your WhatsApp number

    Linking.canOpenURL(whatsappURL)
      .then((supported) => {
        if (supported) {
          Linking.openURL(whatsappURL);
          clearCart(); // Optionally clear cart after opening WhatsApp
        } else {
          Alert.alert(
            "Error",
            "WhatsApp is not installed or cannot be opened."
          );
        }
      })
      .catch((err) => console.error("WhatsApp checkout error:", err));
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <AppBar title="Cart" onMenuPress={() => navigation.openDrawer()} />

      {cart.length === 0 ? (
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
                  <Text style={styles.price}>R {item.price}</Text>
                </View>
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => removeFromCart(index)}
                >
                  <Text style={styles.removeText}>Remove</Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>

          <View style={styles.checkoutContainer}>
            <Text style={styles.totalText}>Total: R{totalPrice}</Text>
            <TouchableOpacity
              style={styles.checkoutButton}
              onPress={handleCheckout}
            >
              <Text style={styles.checkoutButtonText}>Checkout via WhatsApp</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 120,
  },
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
  image: {
    width: 80,
    height: 80,
    borderRadius: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  price: {
    color: "#d41ed3",
    fontWeight: "bold",
  },
  removeButton: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: "#ff4d4d",
    borderRadius: 12,
  },
  removeText: {
    color: "#fff",
    fontWeight: "bold",
  },
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
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#010a33",
  },
  checkoutButton: {
    backgroundColor: "#25D366", // WhatsApp green
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 24,
  },
  checkoutButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 20,
    color: "#010a33",
  },
});