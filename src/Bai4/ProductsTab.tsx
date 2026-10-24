import React from "react";
import { FlatList, SafeAreaView, StyleSheet, Text } from "react-native";
import { Phone } from "../types";
import { colors } from "../theme";
import { ProductRow } from "../components/ProductRow";
import { TabProps } from "./types";

type Props = TabProps<"Products"> & {
  phones: Phone[];
};

export function ProductsTab({ navigation, phones }: Props) {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Tất cả sản phẩm</Text>

      <FlatList
      style={styles.product}
        data={phones}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ProductRow
          
            phone={item}
            onPress={() =>
              navigation.navigate("ProductDetails", { id: item.id })
            }
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
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 14,
    color: colors.text,
    margin: 15
  },
  product:{
    margin: 10
  }
});