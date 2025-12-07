import { Colors } from '@/constants/Colors';
import { GENERIC_PROMPTS, MOOD_PROMPTS } from '@/constants/Prompts';
import { MoodType, useJournalStore } from '@/stores/useJournalStore';
import { useRouter } from 'expo-router';
import { Check, RefreshCcw, X } from 'lucide-react-native';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


import { useThemeStore } from '@/stores/useThemeStore';

const MOODS: MoodType[] = [
    'happy', 'calm', 'excited', 'grateful', 'confident', 'loving', 'proud', 'hopeful',
    'tired', 'perplexed', 'anxious', 'jealous', 'sad', 'bored', 'frustrated', 'lonely', 'angry'
];

export default function NewEntryScreen() {
    const router = useRouter();
    const { addEntry } = useJournalStore();
    const { theme } = useThemeStore();
    const colors = theme === 'dark' ? Colors.dark : Colors.oceanCalm;

    const [text, setText] = useState('');
    const [mood, setMood] = useState<MoodType>('happy');
    const [isSaving, setIsSaving] = useState(false);
    const [prompt, setPrompt] = useState(GENERIC_PROMPTS[0]);

    // Update prompt when mood changes
    React.useEffect(() => {
        const prompts = MOOD_PROMPTS[mood] || GENERIC_PROMPTS;
        const randomInfo = prompts[Math.floor(Math.random() * prompts.length)];
        setPrompt(randomInfo);
    }, [mood]);

    const shufflePrompt = () => {
        const prompts = MOOD_PROMPTS[mood] || GENERIC_PROMPTS;
        let newPrompt = prompt;
        // Ensure new prompt is different if possible
        if (prompts.length > 1) {
            while (newPrompt === prompt) {
                newPrompt = prompts[Math.floor(Math.random() * prompts.length)];
            }
        } else {
            newPrompt = prompts[0];
        }
        setPrompt(newPrompt);
    };

    const handleSave = async () => {
        if (!text.trim()) return;
        setIsSaving(true);
        try {
            await addEntry({
                text,
                mood,
            });
            router.back();
        } catch (error) {
            console.error(error);
        } finally {
            setIsSaving(false);
        }
    };

    const getMoodColor = () => {
        // @ts-ignore
        // If theme is dark, maybe we want darker mood variants? For now use standard mood colors as they define the 'entry'.
        return Colors.oceanCalm.mood[mood] || colors.background;
    };

    return (
        <View style={[styles.container, { backgroundColor: getMoodColor() }]}>
            <SafeAreaView style={styles.safeArea}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={{ flex: 1 }}
                >
                    {/* Header */}
                    <View style={styles.header}>
                        <Pressable onPress={() => router.back()} style={[styles.iconButton, { backgroundColor: theme === 'dark' ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.5)' }]}>
                            <X color={theme === 'dark' ? '#fff' : '#1a1a1a'} size={24} />
                        </Pressable>
                        <Text style={[styles.headerTitle, { color: theme === 'dark' ? '#fff' : '#1a1a1a' }]}>New Entry</Text>
                        <Pressable onPress={handleSave} style={[styles.iconButton, { backgroundColor: '#1a1a1a' }]}>
                            <Check color="#fff" size={20} strokeWidth={3} />
                        </Pressable>
                    </View>

                    <ScrollView contentContainerStyle={styles.content}>

                        {/* Mood Selector - Carousel */}
                        <View style={styles.section}>
                            <Text style={[styles.label, { color: theme === 'dark' ? '#eee' : '#333' }]}>How are you feeling?</Text>
                            <ScrollView
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={styles.moodCarousel}
                            >
                                {MOODS.map((m) => (
                                    <Pressable
                                        key={m}
                                        style={[
                                            styles.moodCard,
                                            // Conditional styling for unselected items in dark mode?
                                            { backgroundColor: theme === 'dark' ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.4)', borderColor: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)' },
                                            mood === m && styles.moodCardSelected
                                        ]}
                                        onPress={() => setMood(m as MoodType)}
                                    >
                                        <Text style={[styles.moodEmoji, mood === m && { transform: [{ scale: 1.2 }] }]}>
                                            {/* We can maps emojis or just use the icon logic later if we want icons here too. For now text. */}
                                            {m === 'happy' ? '😊' :
                                                m === 'calm' ? '😌' :
                                                    m === 'excited' ? '🤩' :
                                                        m === 'grateful' ? '🥰' :
                                                            m === 'confident' ? '😎' :
                                                                m === 'loving' ? '😍' :
                                                                    m === 'proud' ? '🦁' :
                                                                        m === 'hopeful' ? '🌈' :
                                                                            m === 'tired' ? '😴' :
                                                                                m === 'perplexed' ? '🤔' :
                                                                                    m === 'anxious' ? '😰' :
                                                                                        m === 'jealous' ? '😒' :
                                                                                            m === 'sad' ? '😔' :
                                                                                                m === 'bored' ? '😐' :
                                                                                                    m === 'frustrated' ? '😤' :
                                                                                                        m === 'lonely' ? '🌧️' :
                                                                                                            m === 'angry' ? '😡' : '😔'}
                                        </Text>
                                        <Text style={[styles.moodText, { color: theme === 'dark' ? '#ccc' : '#333' }, mood === m && styles.moodTextSelected]}>
                                            {m}
                                        </Text>
                                    </Pressable>
                                ))}
                            </ScrollView>
                        </View>

                        <View style={styles.section}>
                            <View style={styles.promptHeader}>
                                <Text style={styles.label}>Reflection Prompt</Text>
                                <Pressable onPress={shufflePrompt} style={styles.shuffleBtn}>
                                    <RefreshCcw size={14} color="#666" />
                                    <Text style={styles.shuffleText}>Shuffle</Text>
                                </Pressable>
                            </View>
                            <Text style={styles.promptText}>"{prompt}"</Text>
                        </View>

                        {/* Text Input */}
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.textInput}
                                placeholder="Write about your day..."
                                placeholderTextColor="#666"
                                multiline
                                value={text}
                                onChangeText={setText}
                                textAlignVertical="top"
                                autoFocus
                            />
                        </View>

                    </ScrollView>
                </KeyboardAvoidingView>
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
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 10,
        marginBottom: 20,
    },
    iconButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(255,255,255,0.5)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
    },
    content: {
        paddingHorizontal: 24,
    },
    section: {
        marginBottom: 30,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 12,
        color: '#666',
        textTransform: 'uppercase',
    },
    moodCarousel: {
        gap: 12,
        paddingHorizontal: 4, // Add clearer horizontal padding
        paddingRight: 24,
        paddingVertical: 20, // ample space for scale animation to not be chopped
    },
    moodCard: {
        width: 60,
        height: 80,
        padding: 6,
        borderRadius: 16,
        backgroundColor: 'rgba(255,255,255,0.4)',
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.05)',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4,
    },
    moodCardSelected: {
        backgroundColor: '#1a1a1a',
        borderColor: '#1a1a1a',
        transform: [{ scale: 1.1 }]
    },
    moodEmoji: {
        fontSize: 24,
    },
    moodText: {
        textTransform: 'capitalize',
        color: '#333',
        fontWeight: '600',
        fontSize: 10,
    },
    moodTextSelected: {
        color: '#fff',
    },
    scoreRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    scoreValue: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    stepper: {
        flexDirection: 'row',
        gap: 10,
    },
    stepBtn: {
        flex: 1,
        height: 50,
    },
    promptHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    shuffleBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        padding: 4,
    },
    shuffleText: {
        fontSize: 12,
        color: '#666',
        fontWeight: '500',
    },
    promptText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1a1a1a',
        fontStyle: 'italic',
        lineHeight: 26,
    },
    inputContainer: {
        flex: 1,
        backgroundColor: 'rgba(255,255,255,0.6)',
        borderRadius: 24,
        padding: 20,
        minHeight: 200,
    },
    textInput: {
        fontSize: 18,
        lineHeight: 28,
        color: '#1a1a1a',
        minHeight: 150,
    }
});
