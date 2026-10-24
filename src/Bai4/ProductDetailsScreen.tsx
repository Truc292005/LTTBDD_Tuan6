import React from "react";
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
} from "react-native";
import { Phone } from "../types";
import { PHONE_COLORS } from "../data/phones";
import { colors, formatPrice } from "../theme";
import { Stars } from "../components/Stars";
import { useFavorites } from "./FavoritesContext";
import { RootProps } from "./types";

type Props = RootProps<"ProductDetails"> & {
  phones: Phone[];
};

export function ProductDetailsScreen({ route, phones }: Props) {
  const { id } = route.params;
  const phone = phones.find((item) => item.id === id);
  const { has, toggle } = useFavorites();

  if (!phone) {
    return (
      <SafeAreaView style={styles.center}>
        <Text>Không tìm thấy sản phẩm #{id}</Text>
      </SafeAreaView>
    );
  }

  const isFavorite = has(phone.id);
  const color = phone.defaultColor;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Image
          source={PHONE_COLORS[color].image}
          style={styles.image}
          resizeMode="contain"
        />

        <Text style={styles.name}>{phone.name}</Text>
        <Stars value={phone.rating} size={20} />

        <Text style={styles.price}>{formatPrice(phone.price)}</Text>

        {phone.oldPrice > phone.price && (
          <Text style={styles.oldPrice}>
            Giá cũ: {formatPrice(phone.oldPrice)}
          </Text>
        )}

        <Text style={styles.supplier}>
          Cung cấp bởi: {phone.supplier}
        </Text>

        <Text style={styles.rating}>
          {phone.rating}/5 · {phone.reviewCount} lượt đánh giá
        </Text>

        <Pressable
          style={[styles.button, isFavorite && styles.savedButton]}
          onPress={() => toggle(phone.id)}
        >
          <Text style={styles.buttonText}>
            {isFavorite ? "♥ Đã lưu" : "♡ Lưu vào yêu thích"}
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    padding: 20,
    alignItems: "center",
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 220,
    height: 240,
    marginBottom: 18,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.text,
    textAlign: "center",
    marginBottom: 10,
  },
  price: {
    fontSize: 22,
    color: colors.red,
    fontWeight: "bold",
    marginTop: 12,
  },
  oldPrice: {
    color: colors.muted,
    textDecorationLine: "line-through",
    marginTop: 5,
  },
  supplier: {
    color: colors.text,
    marginTop: 12,
  },
  rating: {
    color: colors.muted,
    marginTop: 8,
  },
  button: {
    marginTop: 24,
    backgroundColor: colors.red,
    padding: 14,
    width: "100%",
    alignItems: "center",
    borderRadius: 8,
  },
  savedButton: {
    backgroundColor: colors.blue,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});