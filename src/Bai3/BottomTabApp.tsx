import React, { useCallback, useEffect, useState } from "react";
import {
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { Phone } from "../types";
import { fetchPhones } from "../api/phoneApi";
import { Loading } from "../components/Loading";
import { ErrorBox } from "../components/ErrorBox";
import { ProductRow } from "../components/ProductRow";
import { colors } from "../theme";

type TabParamList = {
  Home: undefined;
  Search: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

const ICONS: Record<
  keyof TabParamList,
  [
    keyof typeof Ionicons.glyphMap,
    keyof typeof Ionicons.glyphMap
  ]
> = {
  Home: ["home", "home-outline"],
  Search: ["search", "search-outline"],
  Profile: ["person", "person-outline"],
};

function HomeTab({ phones }: { phones: Phone[] }) {
  return (
    <SafeAreaView style={styles.page}>
      <Text style={styles.heading}>Danh sách điện thoại</Text>

      <FlatList
        data={phones}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <ProductRow
            phone={item}
            onPress={() => {}}
            rightText=""
          />
        )}
      />
    </SafeAreaView>
  );
}

function SearchTab({ phones }: { phones: Phone[] }) {
  const [keyword, setKeyword] = useState("");

  const normalizedKeyword = keyword.trim().toLowerCase();

    const filteredPhones = phones.filter((phone) =>
    phone.name.trim().toLowerCase().includes(normalizedKeyword)
    );

  return (
    <SafeAreaView style={styles.page}>
      <Text style={styles.heading}>Tìm kiếm điện thoại</Text>

      <TextInput
        value={keyword}
        onChangeText={setKeyword}
        placeholder="Nhập tên điện thoại..."
        style={styles.input}
        autoCapitalize="none"
        clearButtonMode="while-editing"
      />

      {filteredPhones.length === 0 ? (
        <Text style={styles.empty}>
          Không có kết quả cho “{keyword}”
        </Text>
      ) : (
        <FlatList
          data={filteredPhones}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <ProductRow
              phone={item}
              onPress={() => {}}
              rightText=""
            />
          )}
        />
      )}
    </SafeAreaView>
  );
}

function ProfileTab() {
  return (
    <View style={styles.profile}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>MT</Text>
      </View>

      <Text style={styles.profileName}>Nguyễn Mai Trúc</Text>
      <Text style={styles.email}>trucnguyen@gmail.com</Text>
    </View>
  );
}

export function BottomTabApp() {
  const [phones, setPhones] = useState<Phone[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      setPhones(await fetchPhones());
    } catch (e) {
      setError(
        e instanceof Error ? e.message : "Không thể tải danh sách."
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
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: true,
          tabBarActiveTintColor: colors.red,
          tabBarInactiveTintColor: colors.muted,
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={ICONS[route.name][focused ? 0 : 1]}
              size={size}
              color={color}
            />
          ),
        })}
      >
        <Tab.Screen name="Home" options={{ title: "Trang chủ" }}>
          {() => <HomeTab phones={phones} />}
        </Tab.Screen>

        <Tab.Screen name="Search" options={{ title: "Tìm kiếm" }}>
          {() => <SearchTab phones={phones} />}
        </Tab.Screen>

        <Tab.Screen name="Profile" options={{ title: "Cá nhân" }}>
          {() => <ProfileTab />}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.bg,
    padding: 16,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 14,
  },
  list: {
    paddingBottom: 16,
  },
  input: {
    backgroundColor: "#fff",
    borderColor: colors.line,
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 14,
  },
  empty: {
    textAlign: "center",
    color: colors.muted,
    marginTop: 24,
  },
  profile: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: colors.blue,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
  },
  avatarText: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
  },
  profileName: {
    fontSize: 22,
    fontWeight: "bold",
    color: colors.text,
  },
  email: {
    fontSize: 15,
    color: colors.muted,
    marginTop: 8,
  },
});