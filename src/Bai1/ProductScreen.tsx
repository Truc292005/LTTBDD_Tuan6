import React from "react";
import {
  Alert,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Phone } from "../types";
import { PHONE_COLORS } from "../data/phones";
import { colors, formatPrice } from "../theme";
import { Stars } from "../components/Stars";
import { SelectPhoneParamList } from "./SelectPhoneApp";

type Props = NativeStackScreenProps<SelectPhoneParamList, "Product"> & {
  phone: Phone;
};

export function ProductScreen({ navigation, route, phone }: Props) {
  const picked = route.params?.color;
  const shown = picked ?? phone.defaultColor;

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.imageWrap}>
          <Image
            source={PHONE_COLORS[shown].image}
            style={styles.image}
            resizeMode="contain"
          />
        </View>

        <View style={styles.info}>
          <Text style={styles.name}>{phone.name}</Text>

          <View style={styles.row}>
            <Stars value={phone.rating} />
            <Text style={styles.review}>
              ({phone.reviewCount} đánh giá)
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.price}>{formatPrice(phone.price)}</Text>
            {phone.oldPrice > phone.price && (
              <Text style={styles.oldPrice}>
                {formatPrice(phone.oldPrice)}
              </Text>
            )}
          </View>

          {!!phone.badge && (
            <Text style={styles.badge}>{phone.badge}</Text>
          )}

          <Pressable
            style={styles.chooseBtn}
            onPress={() =>
              navigation.navigate("ChooseColor", { color: picked })
            }
          >
            <Text style={styles.chooseText}>
              {phone.colors.length} MÀU - CHỌN {picked ? "LOẠI" : "MÀU"}
            </Text>
            <Text style={styles.arrow}>›</Text>
          </Pressable>
        </View>

        <Pressable
          style={styles.buyBtn}
          onPress={() =>
            Alert.alert("Chọn mua", `Bạn đã chọn ${phone.name}`)
          }
        >
          <Text style={styles.buyText}>CHỌN MUA</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  imageWrap: {
    height: 300,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "90%",
    height: "90%",
  },
  info: {
    gap: 12,
  },
  name: {
    fontSize: 18,
    color: colors.text,
    fontWeight: "500",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  review: {
    color: colors.muted,
    fontSize: 13,
  },
  price: {
    fontSize: 20,
    color: colors.red,
    fontWeight: "bold",
  },
  oldPrice: {
    color: colors.muted,
    textDecorationLine: "line-through",
  },
  badge: {
    alignSelf: "flex-start",
    color: colors.red,
    fontWeight: "bold",
    borderWidth: 1,
    borderColor: colors.red,
    padding: 6,
    borderRadius: 4,
  },
  chooseBtn: {
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 6,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
  },
  chooseText: {
    color: colors.text,
    fontWeight: "600",
  },
  arrow: {
    position: "absolute",
    right: 12,
    fontSize: 24,
    color: colors.muted,
  },
  buyBtn: {
    marginTop: 20,
    backgroundColor: colors.red,
    paddingVertical: 15,
    borderRadius: 6,
    alignItems: "center",
  },
  buyText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});