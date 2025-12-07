import { TabBar } from '@/components/ui/TabBar';
import { Colors } from '@/constants/Colors';
import { useThemeStore } from '@/stores/useThemeStore';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { withLayoutContext } from 'expo-router';
import { View } from 'react-native';

const { Navigator } = createMaterialTopTabNavigator();

export const MaterialTopTabs = withLayoutContext(Navigator);

export default function TabLayout() {
  const { theme } = useThemeStore();

  return (
    <View style={{ flex: 1, backgroundColor: theme === 'dark' ? Colors.dark.background : Colors.oceanCalm.background }}>
      <MaterialTopTabs
        // @ts-ignore
        tabBar={(props) => <TabBar {...props} />}
        tabBarPosition="bottom"
        screenOptions={{
          headerShown: false,
          swipeEnabled: true,
          animationEnabled: true,
        }}
      >
        <MaterialTopTabs.Screen name="index" />
        <MaterialTopTabs.Screen name="stats" />
      </MaterialTopTabs>
    </View>
  );
}
