import { Stack } from "expo-router";
import {
  useFonts,
  ComicNeue_400Regular,
  ComicNeue_700Bold,
} from "@expo-google-fonts/comic-neue";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "../globals.css";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  let [fontsLoaded] = useFonts({
    ComicNeue_400Regular,
    ComicNeue_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="lessons" options={{ headerShown: false }} />
    </Stack>
  );
}
