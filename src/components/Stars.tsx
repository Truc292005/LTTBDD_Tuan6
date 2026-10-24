import React from "react";
import { Text } from "react-native";
import { colors } from "../theme";

export function Stars({
  value,
  size = 16,
}: {
  value: number;
  size?: number;
}) {
  const rating = Math.round(Math.max(0, Math.min(5, value)));

  return (
    <Text style={{ color: colors.star, fontSize: size }}>
      {"★".repeat(rating)}
      <Text style={{ color: colors.line }}>
        {"★".repeat(5 - rating)}
      </Text>
    </Text>
  );
}