import { PixelYear } from '@/components/ui/PixelYear';
import { Colors } from '@/constants/Colors';
import { SENTIMENT_DICTIONARY } from '@/constants/SentimentDictionary';
import { useJournalStore } from '@/stores/useJournalStore';
import { useThemeStore } from '@/stores/useThemeStore';
import { addMonths, format, isAfter, isBefore, isSameMonth, startOfMonth, subMonths } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function StatsScreen() {
    const { entries, loadEntries } = useJournalStore();
    const { theme } = useThemeStore();
    const colors = theme === 'dark' ? Colors.dark : Colors.oceanCalm;

    const [currentMonth, setCurrentMonth] = useState(new Date());

    useEffect(() => {
        loadEntries();
    }, []);

    const filteredEntries = entries.filter(e => isSameMonth(new Date(e.date), currentMonth));
    console.log('Stats Debug:', {
        totalEntries: entries.length,
        currentMonth: currentMonth.toISOString(),
        filteredCount: filteredEntries.length,
        firstEntry: entries[0]
    });

    // Navigation limits
    const now = new Date();
    // Default to 'now' if no entries, else find earliest.
    // If we have entries, the user is allowed to go back to the month of the first entry.
    // 'install date' is effectively the first entry date for this context.
    const earliestDate = entries.length > 0
        ? new Date(Math.min(...entries.map(e => new Date(e.date).getTime())))
        : now;

    const canGoBack = isAfter(startOfMonth(currentMonth), startOfMonth(earliestDate));
    const canGoForward = isBefore(startOfMonth(currentMonth), startOfMonth(now));

    // Calculate Monthly Vibe (Average)
    const moodWeights: Record<string, number> = {
        excited: 5,
        happy: 4, grateful: 4, loving: 4, proud: 4,
        hopeful: 3, confident: 3,
        calm: 1,
        perplexed: 0,
        bored: -1, tired: -1,
        anxious: -2, sad: -2,
        lonely: -3, jealous: -3, frustrated: -3,
        angry: -4
    };

    // Calculate average score
    let totalScore = 0;
    let totalDataPoints = 0;

    if (filteredEntries.length > 0) {
        totalScore = filteredEntries.reduce((sum, entry) => {
            let entryScore = moodWeights[entry.mood] || 0;
            let entryPoints = 1; // The mood itself is 1 data point

            // Scan for keywords
            if (entry.text) {
                // Split by non-word characters to get clean tokens
                const words = entry.text.toLowerCase().split(/[^a-z0-9]+/);
                for (const word of words) {
                    if (word && SENTIMENT_DICTIONARY[word] !== undefined) {
                        entryScore += SENTIMENT_DICTIONARY[word];
                        entryPoints += 1;
                    }
                }
            }

            totalDataPoints += entryPoints;
            return sum + entryScore;
        }, 0);
    }
    const averageScore = totalDataPoints > 0 ? totalScore / totalDataPoints : 0;

    // Find closest mood to average
    // We can also just display the mood that matches the rounded average if we want to be strict,
    // or find the *closest* weight.
    const sortedMoodsByWeight = Object.entries(moodWeights).sort((a, b) => a[1] - b[1]);

    // Find closest mood
    let monthlyVibe = '';
    let minDiff = Infinity;

    if (filteredEntries.length > 0) {
        for (const [mood, weight] of sortedMoodsByWeight) {
            const diff = Math.abs(weight - averageScore);
            if (diff < minDiff) {
                minDiff = diff;
                monthlyVibe = mood;
            }
        }
    }

    // Secondary stat: dominant mood percentage for breakdown
    const moodCounts = filteredEntries.reduce((acc, entry) => {
        acc[entry.mood] = (acc[entry.mood] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => canGoBack && setCurrentMonth(subMonths(currentMonth, 1))}
                    disabled={!canGoBack}
                    style={{ opacity: canGoBack ? 1 : 0 }}
                >
                    <ChevronLeft color={colors.text} size={24} />
                </TouchableOpacity>
                <View style={[styles.monthSelector, { backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.1)' : '#f5f5f5' }]}>
                    <Text style={[styles.monthTitle, { color: colors.text }]}>{format(currentMonth, 'MMMM yyyy')}</Text>
                </View>
                <TouchableOpacity
                    onPress={() => canGoForward && setCurrentMonth(addMonths(currentMonth, 1))}
                    disabled={!canGoForward}
                    style={{ opacity: canGoForward ? 1 : 0 }}
                >
                    <ChevronRight color={colors.text} size={24} />
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>

                {/* Monthly Vibe */}
                <View style={styles.sectionContainer}>
                    <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>Monthly Vibe</Text>
                    <View style={[styles.moodSummaryCard, { backgroundColor: theme === 'dark' ? '#333' : '#fff' }]}>
                        {monthlyVibe ? (
                            <>
                                <View style={[styles.moodIconLarge, { backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)' }]}>
                                    <Text style={{ fontSize: 40 }}>
                                        {monthlyVibe === 'happy' ? '😊' :
                                            monthlyVibe === 'calm' ? '😌' :
                                                monthlyVibe === 'excited' ? '🤩' :
                                                    monthlyVibe === 'grateful' ? '🥰' :
                                                        monthlyVibe === 'confident' ? '😎' :
                                                            monthlyVibe === 'loving' ? '😍' :
                                                                monthlyVibe === 'proud' ? '🦁' :
                                                                    monthlyVibe === 'hopeful' ? '🌈' :
                                                                        monthlyVibe === 'tired' ? '😴' :
                                                                            monthlyVibe === 'perplexed' ? '🤔' :
                                                                                monthlyVibe === 'anxious' ? '😰' :
                                                                                    monthlyVibe === 'jealous' ? '😒' :
                                                                                        monthlyVibe === 'sad' ? '😔' :
                                                                                            monthlyVibe === 'bored' ? '😐' :
                                                                                                monthlyVibe === 'frustrated' ? '😤' :
                                                                                                    monthlyVibe === 'lonely' ? '🌧️' :
                                                                                                        monthlyVibe === 'angry' ? '😡' : '✨'}
                                    </Text>
                                </View>
                                <View>
                                    <Text style={[styles.moodTitle, { color: colors.text }]}>{monthlyVibe.charAt(0).toUpperCase() + monthlyVibe.slice(1)}</Text>
                                    <Text style={[styles.moodSubtitle, { color: colors.textSecondary }]}>Based on {filteredEntries.length} entries</Text>
                                </View>
                            </>
                        ) : (
                            <Text style={{ color: colors.textSecondary }}>No entries yet.</Text>
                        )}
                    </View>
                </View>

                {/* Year in Pixels */}
                <View style={styles.sectionContainer}>
                    <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>Year in Pixels</Text>
                    <View style={styles.pixelGrid}>
                        <PixelYear entries={entries} />
                    </View>
                </View>

                {/* Breakdown */}
                <View style={[styles.sectionContainer, styles.breakdownContainer]}>
                    <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>Breakdown</Text>
                    {Object.entries(moodCounts).map(([mood, count]) => {
                        // @ts-ignore
                        const moodColor = colors.mood[mood] || colors.primary;
                        return (
                            <View key={mood} style={styles.breakdownItem}>
                                <View style={{ width: 100 }}>
                                    <Text style={[styles.breakdownLabel, { color: colors.text }]}>
                                        {mood.charAt(0).toUpperCase() + mood.slice(1)}
                                    </Text>
                                </View>
                                <View style={[styles.progressBarContainer, { backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)' }]}>
                                    <View
                                        style={[
                                            styles.progressBarFill,
                                            {
                                                backgroundColor: moodColor,
                                                width: `${(count / filteredEntries.length) * 100}%`
                                            }
                                        ]}
                                    />
                                </View>
                                <Text style={[styles.breakdownValue, { color: colors.textSecondary }]}>{Math.round((count / filteredEntries.length) * 100)}%</Text>
                            </View>
                        );
                    })}
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.oceanCalm.background,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 24,
        paddingVertical: 16,
    },
    monthSelector: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        backgroundColor: '#f5f5f5',
        borderRadius: 20,
    },
    monthTitle: {
        fontSize: 16,
        fontWeight: '600',
    },
    scrollContent: {
        paddingHorizontal: 24,
        paddingBottom: 40,
    },
    sectionTitle: {
        fontSize: 16,
        color: '#666',
        marginBottom: 8,
    },
    mainCard: {
        backgroundColor: Colors.oceanCalm.primary,
        borderRadius: 32,
        padding: 24,
        minHeight: 300,
        marginBottom: 30,
        justifyContent: 'space-between',
    },
    moodTitle: {
        fontSize: 32,
        fontWeight: 'bold', // Font should be lighter/serif maybe
        fontFamily: 'System',
        marginBottom: 10,
    },
    statsRow: {
        marginBottom: 20,
    },
    percentage: {
        fontSize: 48,
        fontWeight: 'bold',
    },
    moodSubtitle: {
        fontSize: 16,
        opacity: 0.7,
        textTransform: 'capitalize',
    },
    illustrationPlaceholder: {
        height: 150,
        // alignItems: 'flex-end',
        // justifyContent: 'flex-end'
    },
    sectionContainer: {
        marginBottom: 30,
    },
    moodSummaryCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        borderRadius: 24,
        marginTop: 10,
        gap: 16,
    },
    moodIconLarge: {
        width: 80,
        height: 80,
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    progressBarContainer: {
        flex: 1,
        height: 8,
        backgroundColor: 'rgba(0,0,0,0.05)',
        borderRadius: 4,
        overflow: 'hidden',
    },
    breakdownContainer: {
        gap: 12,
        paddingBottom: 40,
    },
    pixelGrid: {
        marginTop: 10,
    },
    breakdownItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    breakdownLabel: {
        width: 80,
        fontSize: 14,
        fontWeight: '500',
        color: '#666',
        textTransform: 'capitalize',
    },
    progressBarBg: {
        flex: 1,
        height: 8,
        backgroundColor: '#eee',
        borderRadius: 4,
        overflow: 'hidden',
    },
    progressBarFill: {
        height: '100%',
        borderRadius: 4,
    },
    breakdownValue: {
        width: 40,
        textAlign: 'right',
        fontSize: 14,
        fontWeight: '600',
        color: '#666',
    },

});
