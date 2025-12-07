import { Colors } from '@/constants/Colors';
import { JournalEntry } from '@/stores/useJournalStore';
import { useThemeStore } from '@/stores/useThemeStore';
import { format, isToday, isYesterday } from 'date-fns';
import { ChevronDown, ChevronRight } from 'lucide-react-native';
import React, { useState } from 'react';
import { LayoutAnimation, Platform, Pressable, StyleSheet, Text, UIManager, View } from 'react-native';
import { EntryCard } from './EntryCard';

if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
}

interface DayGroupProps {
    date: Date;
    entries: JournalEntry[];
    onEntryPress: (id: string) => void;
}

export const DayGroup: React.FC<DayGroupProps> = ({ date, entries, onEntryPress }) => {
    const { theme } = useThemeStore();
    const colors = theme === 'dark' ? Colors.dark : Colors.oceanCalm;

    // Default expand "Today", others collapsed? Or all expanded?
    // User asked "can be collapsed". Let's default to expanded for better UX, allowing collapse.
    const [expanded, setExpanded] = useState(true);

    const toggleExpand = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpanded(!expanded);
    };

    const getDateLabel = () => {
        if (isToday(date)) return 'Today';
        if (isYesterday(date)) return 'Yesterday';
        return format(date, 'EEEE, d MMM');
    };

    const getMoodDotColor = (mood: string) => {
        // @ts-ignore
        return (theme === 'dark' ? Colors.dark.mood[mood] : Colors.oceanCalm.mood[mood]) || '#ccc';
    };

    return (
        <View style={styles.container}>
            <Pressable
                onPress={toggleExpand}
                style={[styles.header, { backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)' }]}
            >
                <View style={styles.headerLeft}>
                    {expanded ? <ChevronDown size={20} color={colors.textSecondary} /> : <ChevronRight size={20} color={colors.textSecondary} />}
                    <Text style={[styles.dateLabel, { color: colors.text }]}>{getDateLabel()}</Text>
                    <Text style={[styles.countLabel, { color: colors.textSecondary }]}>{entries.length} entries</Text>
                </View>

                {/* Mood dots summary if collapsed? Or always? */}
                {/* Let's show small dots for the moods in this group */}
                <View style={styles.moodDots}>
                    {entries.slice(0, 5).map((e, i) => (
                        <View key={e.id} style={[styles.dot, { backgroundColor: getMoodDotColor(e.mood) }]} />
                    ))}
                    {entries.length > 5 && <View style={[styles.dot, { backgroundColor: colors.textSecondary }]} />}
                </View>
            </Pressable>

            {expanded && (
                <View style={styles.content}>
                    {entries.map((entry, index) => (
                        <EntryCard
                            key={entry.id}
                            entry={entry}
                            index={index}
                            onPress={() => onEntryPress(entry.id)}
                        />
                    ))}
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 16,
        marginBottom: 8,
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    dateLabel: {
        fontSize: 16,
        fontWeight: '600',
    },
    countLabel: {
        fontSize: 12,
        fontWeight: '400',
    },
    moodDots: {
        flexDirection: 'row',
        gap: 4,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
    },
    content: {
        gap: 0,
    },
});
