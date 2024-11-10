import { SystemContext, useSystemState } from '@/contexts/SystemProvider';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const systemState = useSystemState();

  const [loaded] = useFonts({
    SpaceMono: require('../../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <SystemContext.Provider value={systemState}>
      <Stack>
        <Stack.Screen name='clients/index' options={{ headerShown: false }} />
        <Stack.Screen name='clients/create' options={{ headerShown: false }} />
        <Stack.Screen name='clients/[cpf]' options={{ headerShown: false }} />
      </Stack>
    </SystemContext.Provider>
  );
}
