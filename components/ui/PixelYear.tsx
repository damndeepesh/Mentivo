import { Colors } from '@/constants/Colors';
import { JournalEntry } from '@/stores/useJournalStore';
import { useThemeStore } from '@/stores/useThemeStore';
import { eachDayOfInterval, eachMonthOfInterval, endOfMonth, format, isSameDay, startOfMonth } from 'date-fns';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

interface PixelYearProps {
    entries: JournalEntry[];
}

export const PixelYear: React.FC<PixelYearProps> = ({ entries }) => {
    const { theme } = useThemeStore();
    const today = new Date();

    // Default to today if no entries, otherwise earliest entry date
    const earliestDate = entries.length > 0
        ? new Date(Math.min(...entries.map(e => new Date(e.date).getTime())))
        : today;

    // Start from the first month of usage
    const startDate = startOfMonth(earliestDate);
    // Show up to the current month (inclusive)
    const endDate = endOfMonth(today);

    const months = eachMonthOfInterval({
        start: startDate,
        end: endDate
    });

    const getDayData = (date: Date) => {
        const dayEntries = entries.filter(e => isSameDay(new Date(e.date), date));
        if (dayEntries.length === 0) return null;

        // Dominant Mood
        const moodCounts = dayEntries.reduce((acc, e) => {
            acc[e.mood] = (acc[e.mood] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);
        const dominantMood = Object.keys(moodCounts).reduce((a, b) => moodCounts[a] > moodCounts[b] ? a : b);

        // Intensity based on count (cap at 4)
        const count = dayEntries.length;
        const opacity = Math.min(1, 0.4 + (count - 1) * 0.2); // 0.4, 0.6, 0.8, 1.0

        return { mood: dominantMood, opacity };
    };

    const getMoodColor = (mood: string) => {
        const moodColors = theme === 'dark' ? Colors.dark.mood : Colors.oceanCalm.mood;
        // @ts-ignore
        return moodColors[mood] || '#ccc';
    };

    return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.container}>
            {months.map((monthDate, i) => {
                const days = eachDayOfInterval({
                    start: startOfMonth(monthDate),
                    end: endOfMonth(monthDate)
                });

                return (
                    <View key={i} style={styles.monthBlock}>
                        <Text style={[styles.monthLabel, { color: theme === 'dark' ? '#aaa' : '#666' }]}>{format(monthDate, 'MMM')}</Text>
                        <View style={styles.daysGrid}>
                            {days.map((day, dIndex) => {
                                const data = getDayData(day);
                                return (
                                    <View
                                        key={dIndex}
                                        style={[
                                            styles.pixel,
                                            {
                                                backgroundColor: data ? getMoodColor(data.mood) : (theme === 'dark' ? 'rgba(255,255,255,0.05)' : '#f4f4f4'),
                                                opacity: data ? data.opacity : 1
                                            }
                                        ]}
                                    />
                                );
                            })}
                        </View>
                    </View>
                );
            })}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        gap: 16,
    },
    monthBlock: {
        width: 80, // approx width for 7 cols of 8px + gap
    },
    monthLabel: {
        fontSize: 12,
        fontWeight: '600',
        marginBottom: 6,
        color: '#666',
    },
    daysGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 2,
    },
    pixel: {
        width: 8,
        height: 8,
        borderRadius: 2,
    }
});
