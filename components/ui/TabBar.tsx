import { Colors } from '@/constants/Colors';
import { useThemeStore } from '@/stores/useThemeStore';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { BlurView } from 'expo-blur';
import { Home, LineChart, Plus } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

export function TabBar({ state, descriptors, navigation }: BottomTabBarProps) {
    const { theme } = useThemeStore();
    const { bottom } = useSafeAreaInsets();
    const colors = theme === 'dark' ? Colors.dark : Colors.oceanCalm;

    return (
        <View style={[styles.container, styles.shadow, { bottom: 40 + bottom }]}>
            <BlurView
                intensity={80}
                tint={theme === 'dark' ? 'dark' : 'extraLight'}
                style={[
                    styles.tabBar,
                    {
                        borderColor: theme === 'dark' ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.3)',
                        backgroundColor: theme === 'dark' ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.3)'
                    }
                ]}
            >
                {state.routes.map((route, index) => {
                    const { options } = descriptors[route.key];
                    const isFocused = state.index === index;

                    const onPress = () => {
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: route.key,
                            canPreventDefault: true,
                        });

                        if (!isFocused && !event.defaultPrevented) {
                            navigation.navigate(route.name, route.params);
                        }
                    };

                    const onLongPress = () => {
                        navigation.emit({
                            type: 'tabLongPress',
                            target: route.key,
                        });
                    };

                    const TabIcon = () => {
                        if (route.name === 'index') return <Home size={20} color={isFocused ? colors.primary : colors.textSecondary} />;
                        if (route.name === 'stats') return <LineChart size={20} color={isFocused ? colors.primary : colors.textSecondary} />;
                        return null;
                    }

                    return (
                        <React.Fragment key={route.key}>
                            <TouchableOpacity
                                accessibilityRole="button"
                                accessibilityState={isFocused ? { selected: true } : {}}
                                accessibilityLabel={options.tabBarAccessibilityLabel}
                                onPress={onPress}
                                onLongPress={onLongPress}
                                style={styles.tabItem}
                            >
                                <TabIcon />
                            </TouchableOpacity>

                            {/* Insert Add Button after the first tab (Home) */}
                            {index === 0 && (
                                <TouchableOpacity
                                    onPress={() => navigation.navigate('entry/new')}
                                    style={styles.tabItem}
                                >
                                    <View style={[styles.mainBtn, { backgroundColor: colors.text }]}>
                                        <Plus color={theme === 'dark' ? '#000' : '#fff'} size={20} />
                                    </View>
                                </TouchableOpacity>
                            )}
                        </React.Fragment>
                    );
                })}
            </BlurView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        // bottom: 40, // Removing static bottom
        left: 80,
        right: 80,
        alignItems: 'center',
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 10,
    },
    tabBar: {
        flexDirection: 'row',
        borderRadius: 25,
        height: 50,
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        overflow: 'hidden',
        paddingHorizontal: 15,
        borderWidth: 1,
    },
    tabItem: {
        width: 44,
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
    },
    mainBtn: {
        width: 38,
        height: 38,
        borderRadius: 19,
        alignItems: 'center',
        justifyContent: 'center',
    }
});
