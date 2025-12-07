import { Colors } from '@/constants/Colors';
import { JournalEntry } from '@/stores/useJournalStore';
import { useThemeStore } from '@/stores/useThemeStore';
import { format } from 'date-fns';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { MoodBadge } from './MoodBadge';


interface EntryCardProps {
    entry: JournalEntry;
    onPress?: () => void;
    index?: number;
}

export const EntryCard: React.FC<EntryCardProps> = ({ entry, onPress, index = 0 }) => {
    const { theme } = useThemeStore();
    const day = format(new Date(entry.date), 'dd');
    const month = format(new Date(entry.date), 'MMM'); // Feb

    // Determine card background color based on mood
    const getCardColor = () => {
        const moodColors = theme === 'dark' ? Colors.dark.mood : Colors.oceanCalm.mood;
        // @ts-ignore
        return moodColors[entry.mood] || (theme === 'dark' ? Colors.dark.card : Colors.oceanCalm.card);
    };

    const cardColor = getCardColor();
    const isDark = theme === 'dark';

    return (
        <Animated.View entering={FadeInDown.delay(index * 100).springify()}>
            <Pressable
                style={({ pressed }) => [
                    styles.container,
                    { backgroundColor: cardColor, transform: [{ scale: pressed ? 0.98 : 1 }] }
                ]}
                onPress={onPress}
            >
                <View style={[styles.dateContainer, isDark && { borderRightColor: 'rgba(255,255,255,0.2)' }]}>
                    <Text style={[styles.dayText, isDark && { color: '#ffffff' }]}>{day}</Text>
                    <Text style={[styles.monthText, isDark && { color: '#e0e0e0' }]}>{month}</Text>
                </View>

                <View style={styles.contentContainer}>
                    <MoodBadge mood={entry.mood} />
                    <Text style={[styles.entryText, isDark && { color: '#f5f5f5' }]} numberOfLines={3}>{entry.text}</Text>
                </View>
            </Pressable>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 16,
        borderRadius: 24,
        marginBottom: 16,
        minHeight: 120,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.05,
        shadowRadius: 3.84,
        elevation: 2,
    },
    dateContainer: {
        alignItems: 'center',
        marginRight: 16,
        paddingRight: 16,
        borderRightWidth: 1,
        borderRightColor: 'rgba(0,0,0,0.05)',
        justifyContent: 'center',
        minWidth: 50,
    },
    dayText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1a1a1a',
    },
    monthText: {
        fontSize: 14,
        color: '#666',
        textTransform: 'uppercase',
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
        gap: 8,
    },
    entryText: {
        fontSize: 16,
        color: '#333',
        lineHeight: 22,
        fontFamily: 'System', // Use system font
    },
});
