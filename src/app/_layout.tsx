import '../global.css';
import { Stack } from 'expo-router';
import { AnimatedSplashOverlay } from '@/components/animated-icon';

export default function RootLayout() {
  return (
    <>
      <AnimatedSplashOverlay />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: '#000000' },
          headerTintColor: '#0A84FF',
          headerShadowVisible: false,
          contentStyle: { backgroundColor: '#000000' },
        }}>
        <Stack.Screen
          name="index"
          options={{
            title: '聯絡人',
            headerLargeTitle: true,
            headerLargeTitleStyle: { color: '#FFFFFF' },
            headerTitleStyle: { color: '#FFFFFF' },
            headerBackTitle: '聯絡人',
          }}
        />
        <Stack.Screen
          name="contact/[id]"
          options={{
            headerTitleStyle: { color: '#FFFFFF' },
          }}
        />
      </Stack>
    </>
  );
}
