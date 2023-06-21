import React from "react";

import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { I18nManager } from "react-native";
import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import AuthNavigation from "./src/navigations/AuthNavigation";
import { initializeApp } from "firebase/app";
import AuthContext from "./src/contexts/AuthContext";
import { User } from "./src/types";
import MainNavigation from "./src/navigations/MainNavigation";
import { getDataFromStorage } from "./src/utils/LocalStorage";
import { USER_KEY } from "./src/utils/Constant";

try {
  I18nManager.allowRTL(false);
  I18nManager.forceRTL(false);

  const firebaseConfig = {
    apiKey: "AIzaSyBLct3uoWkTYT1yHcw0H0CGBfWm7HuYbWA",
    authDomain: "movieapp-5e764.firebaseapp.com",
    projectId: "movieapp-5e764",
    storageBucket: "movieapp-5e764.appspot.com",
    messagingSenderId: "92970552925",
    appId: "1:92970552925:web:083b765f8c22650d4d87b4",
  };
  // Initialize Firebase
  initializeApp(firebaseConfig);
} catch (e) {
  console.log(e);
}

export default function App() {
  const [user, setUser] = React.useState<User | undefined>(undefined);

  const [loaded] = useFonts({
    "Roboto-Black": require("./assets/fonts/Roboto-Black.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
  });

  React.useEffect(() => {
    const fetchLocalUser = async () => {
      const user = await getDataFromStorage(USER_KEY);
      if (!user) setUser(undefined);
      else setUser(user);
    };
    fetchLocalUser();
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <StatusBar style="light" />
      <NavigationContainer theme={DarkTheme}>
        {user === undefined ? <AuthNavigation /> : <MainNavigation />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
