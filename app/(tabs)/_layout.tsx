import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useColorScheme } from "@/hooks/useColorScheme";
import HomeScreen from ".";
import { Ionicons } from "@expo/vector-icons";
import NotificationScreen from "./NotificationScreen";
import WalletStackLayout from "./wallet/_layout";
import MachineStackLayout from "./machine/_layout";
import SettingScreen from "./SettingScreen";
import AuthenStack from "../(auth)/_layout";

const Tab = createBottomTabNavigator();

// Định nghĩa kiểu cho các tên icon
const iconNames = {
  Home: 'home-outline',
  Machine: 'cog-outline', 
  Wallet: 'wallet-outline',
  Notification: 'notifications-outline',
  Setting: 'settings-outline',
} as const;

export default function TabLayout() {
  const colorScheme = useColorScheme();
  
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          const iconName = iconNames[route.name as keyof typeof iconNames]; // Lấy tên icon theo route

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#87CEEB", // Màu khi tab đang hoạt động
        tabBarInactiveTintColor: "gray", // Màu khi tab không hoạt động
        tabBarHideOnKeyboard: true, // Ẩn tab khi bàn phím hiện lên
      })}
    >
      <Tab.Screen name="authen" component={AuthenStack} options={{headerShown:false}}/>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Machine" component={MachineStackLayout} options={{headerShown: false}}/>
      <Tab.Screen name="Wallet" component={WalletStackLayout} options={{headerShown: false}}/>
      <Tab.Screen name="Notification" component={NotificationScreen} />
      <Tab.Screen name="Setting" component={SettingScreen} />
    </Tab.Navigator>
  );
}
