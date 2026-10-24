import React from "react";
import { FlatList, SafeAreaView, StyleSheet, Text } from "react-native";
import { Phone } from "../types";
import { colors } from "../theme";
import { ProductRow } from "../components/ProductRow";
import { useFavorites } from "./FavoritesContext";
import { TabProps } from "./types";

type Props = TabProps<"Favorites"> & {
  phones: Phone[];
};

export function FavoritesTab({ navigation, phones }: Props) {
  const { ids } = useFavorites();
  const favoritePhones = phones.filter((phone) => ids.includes(phone.id));

  if (favoritePhones.length === 0) {
    return (
      <SafeAreaView style={styles.empty}>
        <Text style={styles.emptyText}>Chưa có sản phẩm nào được lưu.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
      style={styles.product}
        data={favoritePhones}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ProductRow
            phone={item}
            onPress={() =>
              navigation.navigate("ProductDetails", { id: item.id })
            }
            rightText="♥"
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.bg,
  },
  empty: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  emptyText: {
    color: colors.muted,
    fontSize: 16,
    textAlign: "center",
  },
  product:{
    margin: 10
  }
});