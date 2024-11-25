import { useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { Image, StyleSheet, Text, View } from "react-native";
import * as SplashScreen from "expo-splash-screen";

import LegalNameScreen from "./src/Screens/LegalNameScreen";
import NotificationScreen from "./src/Screens/NotificationScreen";
import DashboardScreen from "./src/Screens/DashboardScreen";
import NewsScreen from "./src/Screens/NewsScreen";

import { initializeDatabase } from "./src/dbOperation/dbUser";

const Stack = createNativeStackNavigator();

export default function App() {
  useEffect(() => {
    const prepareApp = async () => {
      try {
        await SplashScreen.preventAutoHideAsync();

        await initializeDatabase();
      } catch (e) {
        console.warn(e);
      } finally {
        setTimeout(() => {
           SplashScreen.hideAsync();
        }, 3000);

      }
    };

    prepareApp();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="LegalNameScreen"
      >
        <Stack.Screen name="LegalNameScreen" component={LegalNameScreen} />
        <Stack.Screen
          name="NotificationScreen"
          component={NotificationScreen}
        />
        <Stack.Screen name="DashboardScreen" component={DashboardScreen} />
        <Stack.Screen name="NewsScreen" component={NewsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  footerIcon: {
    width: 25,
  },
});
