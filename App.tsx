
import React from "react";
import { View, StyleSheet } from "react-native";
import { SelectPhoneApp } from "./src/Bai1/SelectPhoneApp";
import { Phone } from "./src/types";

const phone: Phone = {
  id: "1",
  name: "iPhone 17 Pro Max",
  price: 34990000,
  oldPrice: 37990000,
  rating: 4.9,
  reviewCount: 1250,
  supplier: "Apple",
  badge: "Bán chạy",
  colors: ["silver", "black", "blue", "red"],
  defaultColor: "blue",
};

export default function App() {
  return (
    <View style={styles.container}>
      <SelectPhoneApp phone={phone} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
