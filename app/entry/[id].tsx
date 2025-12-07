import { MoodBadge } from '@/components/ui/MoodBadge';
import { Colors } from '@/constants/Colors';
import { useJournalStore } from '@/stores/useJournalStore';
import { useThemeStore } from '@/stores/useThemeStore';
import { format } from 'date-fns';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function EntryDetailScreen() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const { theme } = useThemeStore();
    const colors = theme === 'dark' ? Colors.dark : Colors.oceanCalm;

    const entry = useJournalStore(state => state.entries.find(e => e.id === id));

    if (!entry) {
        return (
            <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                        <ArrowLeft color={colors.text} size={24} />
                    </TouchableOpacity>
                </View>
                <View style={styles.errorContainer}>
                    <Text style={{ color: colors.text }}>Entry not found.</Text>
                </View>
            </SafeAreaView>
        );
    }

    // Helper to get background color based on mood
    const getBackgroundColor = () => {
        // @ts-ignore
        const moodColors = theme === 'dark' ? Colors.dark.mood : Colors.oceanCalm.mood;
        // @ts-ignore
        return moodColors[entry.mood] || colors.background;
    };

    return (
        <View style={[styles.container, { backgroundColor: getBackgroundColor() }]}>
            <SafeAreaView style={styles.safeArea}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()} style={[styles.backButton, { backgroundColor: theme === 'dark' ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.5)' }]}>
                        <ArrowLeft color={colors.text} size={24} />
                    </TouchableOpacity>
                    <Text style={[styles.headerTitle, { color: colors.text }]}>{format(new Date(entry.date), 'MMMM do, yyyy')}</Text>
                    <View style={{ width: 40 }} />
                </View>

                <ScrollView contentContainerStyle={styles.content}>
                    {/* Mood & Score Badge */}
                    <View style={styles.badgeContainer}>
                        <MoodBadge mood={entry.mood} score={entry.score} />
                    </View>

                    {/* Time */}
                    <Text style={[styles.timeText, { color: colors.textSecondary }]}>{format(new Date(entry.date), 'h:mm a')}</Text>

                    {/* Entry Text */}
                    <View style={[styles.card, { backgroundColor: theme === 'dark' ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.6)' }]}>
                        <Text style={[styles.entryText, { color: theme === 'dark' ? '#fff' : '#1a1a1a' }]}>{entry.text}</Text>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    safeArea: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 24,
        paddingVertical: 10,
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255,255,255,0.5)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1a1a1a',
    },
    errorContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        padding: 24,
        alignItems: 'center',
    },
    badgeContainer: {
        marginBottom: 10,
        transform: [{ scale: 1.2 }],
    },
    timeText: {
        fontSize: 14,
        color: 'rgba(0,0,0,0.5)',
        marginBottom: 30,
        fontWeight: '500',
    },
    card: {
        width: '100%',
        backgroundColor: 'rgba(255,255,255,0.6)',
        borderRadius: 24,
        padding: 24,
        minHeight: 200,
    },
    entryText: {
        fontSize: 18,
        lineHeight: 28,
        color: '#1a1a1a',
        fontFamily: 'System',
    }
});
