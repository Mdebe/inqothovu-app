import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Product } from '../data/products';

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  return (
    <View style={styles.card}>
      <Image source={product.image} style={styles.image} />

      <View style={styles.content}>
        <Text style={styles.title}>{product.name}</Text>
        <Text style={styles.price}>R {product.price}</Text>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const primary = "#d41ed3";
const accent = "#1df4f7";

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    marginBottom: 20,
    overflow: "hidden",
    elevation: 4,
  },
  image: {
    width: "100%",
    height: 180,
  },
  content: {
    padding: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 6,
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: primary,
    marginBottom: 12,
  },
  button: {
    backgroundColor: primary,
    paddingVertical: 10,
    borderRadius: 30,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
});