import { useThemeStore } from '@/stores/useThemeStore';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { theme } = useThemeStore();

  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="entry/new" options={{ headerShown: false, presentation: 'modal' }} />
        <Stack.Screen name="entry/[id]" options={{ headerShown: false, presentation: 'modal' }} />
      </Stack>
      <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
    </>
  );
}
