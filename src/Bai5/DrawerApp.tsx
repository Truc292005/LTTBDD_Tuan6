import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../theme";

type DrawerParamList = {
  Home: undefined;
  Profile: undefined;
  Settings: undefined;
};

const Drawer = createDrawerNavigator<DrawerParamList>();

function HomeScreen() {
  return (
    <View style={styles.center}>
      <Text style={styles.big}>Xin chào 👋</Text>
      <Text style={styles.muted}>Chào mừng bạn đến với ứng dụng.</Text>
    </View>
  );
}

function ProfileScreen() {
  return (
    <View style={styles.center}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>MT</Text>
      </View>

      <Text style={styles.big}>Nguyễn Mai Trúc</Text>
      <Text style={styles.muted}>trucnguyen@gmail.com</Text>
    </View>
  );
}

function SettingsScreen() {
  const [notify, setNotify] = useState(true);
  const [dark, setDark] = useState(false);

  return (
    <SafeAreaView
      style={[
        styles.settings,
        { backgroundColor: dark ? "#202124" : "#fff" },
      ]}
    >
      <Text
        style={[
          styles.settingsTitle,
          { color: dark ? "#fff" : colors.text },
        ]}
      >
        Cài đặt
      </Text>

      <View style={styles.settingRow}>
        <Text style={[styles.settingLabel, { color: dark ? "#fff" : colors.text }]}>
          Nhận thông báo
        </Text>
        <Switch value={notify} onValueChange={setNotify} />
      </View>

      <View style={styles.settingRow}>
        <Text style={[styles.settingLabel, { color: dark ? "#fff" : colors.text }]}>
          Giao diện tối
        </Text>
        <Switch value={dark} onValueChange={setDark} />
      </View>

      <Text style={[styles.status, { color: dark ? "#fff" : colors.text }]}>
        Thông báo: {notify ? "BẬT" : "TẮT"} · Giao diện: {dark ? "tối" : "sáng"}
      </Text>
    </SafeAreaView>
  );
}

function CustomDrawerContent(props: DrawerContentComponentProps) {
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerHeader}>
        <View style={styles.smallAvatar}>
          <Text style={styles.avatarText}>MT</Text>
        </View>
        <Text style={styles.drawerName}>Nguyễn Mai Trúc</Text>
        <Text style={styles.muted}>trucnguyen@gmail.com</Text>
      </View>

      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

export function DrawerApp() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={({ route }) => ({
          drawerActiveTintColor: colors.red,
          drawerInactiveTintColor: colors.text,
          headerTintColor: colors.text,
          drawerIcon: ({ color, size }) => {
            let iconName: keyof typeof Ionicons.glyphMap = "home-outline";

            if (route.name === "Profile") {
              iconName = "person-outline";
            } else if (route.name === "Settings") {
              iconName = "settings-outline";
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Drawer.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Trang chủ" }}
        />

        <Drawer.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ title: "Cá nhân" }}
        />

        <Drawer.Screen
          name="Settings"
          component={SettingsScreen}
          options={{ title: "Cài đặt" }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  big: {
    fontSize: 23,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 8,
  },
  muted: {
    fontSize: 14,
    color: colors.muted,
    marginTop: 4,
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
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
  },
  settings: {
    flex: 1,
    padding: 20,
  },
  settingsTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
    margin: 15
  },
  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: colors.line,
  },
  settingLabel: {
    fontSize: 16,
    margin: 15
  },
  status: {
    marginTop: 26,
    fontSize: 15,
    fontWeight: "600",
    margin: 15
  },
  drawerHeader: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.line,
    marginBottom: 8,
  },
  smallAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.blue,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  drawerName: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.text,
  },
});