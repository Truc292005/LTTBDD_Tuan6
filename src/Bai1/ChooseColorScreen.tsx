import React, { useState } from "react";
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Phone, ColorKey } from "../types";
import { PHONE_COLORS, COLOR_ORDER } from "../data/phones";
import { colors, formatPrice } from "../theme";
import { SelectPhoneParamList } from "./SelectPhoneApp";

type Props = NativeStackScreenProps<
  SelectPhoneParamList,
  "ChooseColor"
> & {
  phone: Phone;
};

export function ChooseColorScreen({
  navigation,
  route,
  phone,
}: Props) {
  const [picked, setPicked] = useState<ColorKey | undefined>(
    route.params?.color
  );

  const [line1, ...rest] = phone.name.split(" - ");
  const line2 = rest.join(" - ");

  const availableColors = COLOR_ORDER.filter((color) =>
    phone.colors.includes(color)
  );

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.header}>
        <Image
          source={PHONE_COLORS[picked ?? phone.defaultColor].image}
          style={styles.thumb}
          resizeMode="contain"
        />

        <View style={styles.headerText}>
          <Text style={styles.small}>{line1}</Text>
          {!!line2 && <Text style={styles.small}>{line2}</Text>}

          {picked && (
            <>
              <Text style={styles.detail}>
                Màu: <Text style={styles.bold}>{PHONE_COLORS[picked].label}</Text>
              </Text>
              <Text style={styles.detail}>
                Cung cấp bởi{" "}
                <Text style={styles.bold}>{phone.supplier}</Text>
              </Text>
              <Text style={styles.price}>{formatPrice(phone.price)}</Text>
            </>
          )}
        </View>
      </View>

      <View style={styles.body}>
        <Text style={styles.hint}>Chọn một màu bên dưới:</Text>

        <ScrollView>
          {availableColors.map((key) => (
            <Pressable
              key={key}
              style={styles.colorRow}
              onPress={() => setPicked(key)}
            >
              <View
                style={[
                  styles.swatch,
                  { backgroundColor: PHONE_COLORS[key].hex },
                  picked === key && styles.swatchOn,
                ]}
              />
              <Text style={styles.colorLabel}>
                {PHONE_COLORS[key].label}
              </Text>
              {picked === key && <Text style={styles.check}>✓</Text>}
            </Pressable>
          ))}
        </ScrollView>

        <Pressable
          style={styles.doneBtn}
          onPress={() =>
            navigation.navigate({
              name: "Product",
              params: { color: picked },
              merge: true,
            })
          }
        >
          <Text style={styles.doneText}>XONG</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    padding: 16,
    minHeight: 170,
    alignItems: "center",
    gap: 12,
  },
  thumb: {
    width: 105,
    height: 130,
  },
  headerText: {
    flex: 1,
    gap: 6,
  },
  small: {
    fontSize: 14,
    color: colors.text,
  },
  detail: {
    fontSize: 13,
    color: colors.text,
  },
  bold: {
    fontWeight: "bold",
  },
  price: {
    fontSize: 17,
    color: colors.red,
    fontWeight: "bold",
  },
  body: {
    flex: 1,
    backgroundColor: "#F0F0F0",
    padding: 16,
  },
  hint: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
  },
  colorRow: {
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    marginBottom: 10,
    borderRadius: 4,
    gap: 14,
  },
  swatch: {
    width: 42,
    height: 42,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  swatchOn: {
    borderWidth: 3,
    borderColor: colors.blue,
  },
  colorLabel: {
    fontSize: 16,
    textTransform: "capitalize",
    flex: 1,
  },
  check: {
    fontSize: 20,
    color: colors.blue,
    fontWeight: "bold",
  },
  doneBtn: {
    backgroundColor: colors.blue,
    padding: 14,
    borderRadius: 4,
    alignItems: "center",
    marginTop: 8,
  },
  doneText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});