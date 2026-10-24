import React, { useCallback, useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { Phone } from "../types";
import { fetchPhones } from "../api/phoneApi";
import { Loading } from "../components/Loading";
import { ErrorBox } from "../components/ErrorBox";
import { colors } from "../theme";
import { FavoritesProvider } from "./FavoritesContext";
import { ProductsTab } from "./ProductsTab";
import { FavoritesTab } from "./FavoritesTab";
import { ProductDetailsScreen } from "./ProductDetailsScreen";
import { RootStackParamList, TabParamList } from "./types";

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

function HomeTabs({ phones }: { phones: Phone[] }) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.red,
        tabBarIcon: ({ color, size }) => (
          <Ionicons
            name={route.name === "Products" ? "phone-portrait-outline" : "heart-outline"}
            color={color}
            size={size}
          />
        ),
      })}
    >
      <Tab.Screen name="Products" options={{ title: "Sản phẩm" }}>
        {(props) => <ProductsTab {...props} phones={phones} />}
      </Tab.Screen>

      <Tab.Screen name="Favorites" options={{ title: "Yêu thích" }}>
        {(props) => <FavoritesTab {...props} phones={phones} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

export function StackTabApp() {
  const [phones, setPhones] = useState<Phone[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      setPhones(await fetchPhones());
    } catch (e) {
      setError(
        e instanceof Error ? e.message : "Không tải được danh sách sản phẩm."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  if (loading) return <Loading />;
  if (error) return <ErrorBox message={error} onRetry={load} />;

  return (
    <FavoritesProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" options={{ title: "Cửa hàng" }}>
            {() => <HomeTabs phones={phones} />}
          </Stack.Screen>

          <Stack.Screen
            name="ProductDetails"
            options={{ title: "Chi tiết sản phẩm" }}
          >
            {(props) => (
              <ProductDetailsScreen {...props} phones={phones} />
            )}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </FavoritesProvider>
  );
}