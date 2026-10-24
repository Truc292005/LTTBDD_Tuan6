import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Phone } from "../types";
import { colors, formatPrice } from "../theme";
import { Stars } from "./Stars";

export function ProductRow({
  phone,
  onPress,
  rightText = "›",
}: {
  phone: Phone;
  onPress: () => void;
  rightText?: string;
}) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.info}>
        <Text style={styles.name}>{phone.name}</Text>
        <Stars value={phone.rating} />
        <Text style={styles.price}>{formatPrice(phone.price)}</Text>
        <Text style={styles.supplier}>Cung cấp bởi {phone.supplier}</Text>
      </View>

      <Text style={styles.right}>{rightText}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    padding: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.line,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  info: {
    flex: 1,
    gap: 5,
  },
  name: {
    color: colors.text,
    fontSize: 15,
    fontWeight: "600",
  },
  price: {
    color: colors.red,
    fontSize: 16,
    fontWeight: "bold",
  },
  supplier: {
    color: colors.muted,
    fontSize: 12,
  },
  right: {
    color: colors.red,
    fontSize: 28,
    marginLeft: 10,
  },
});