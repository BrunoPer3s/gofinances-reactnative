import "react-native-gesture-handler";
import "intl";
import "intl/locale-data/jsonp/pt-BR";
import React from "react";
import AppLoading from "expo-app-loading";
import { ThemeProvider } from "styled-components";

import { Routes } from "./src/routes";

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

import lightTheme from "./src/global/styles/theme";
import { StatusBar } from "react-native";
import theme from "./src/global/styles/theme";

import { AuthProvider, useAuth } from "./src/hooks/UseAuth";

export default function App() {
  const { loading } = useAuth();
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  if (!fontsLoaded || loading) {
    return <AppLoading />;
  }

  return (
    <ThemeProvider theme={lightTheme}>
      <AuthProvider>
        <StatusBar
          barStyle="light-content"
          backgroundColor={theme.colors.primary}
        />
        <Routes />
      </AuthProvider>
    </ThemeProvider>
  );
}
