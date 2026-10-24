import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../theme";

export function ErrorBox({
  message,
  onRetry,
}: {
  message: string;
  onRetry: () => void;
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Không tải được dữ liệu</Text>
      <Text style={styles.message}>{message}</Text>

      <Pressable style={styles.button} onPress={onRetry}>
        <Text style={styles.buttonText}>THỬ LẠI</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.white,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.red,
    marginBottom: 10,
  },
  message: {
    textAlign: "center",
    color: colors.text,
    marginBottom: 20,
  },
  button: {
    backgroundColor: colors.blue,
    paddingHorizontal: 28,
    paddingVertical: 12,
    borderRadius: 6,
  },
  buttonText: {
    color: colors.white,
    fontWeight: "bold",
  },
});