import { Colors } from '@/constants/Colors';
import { MoodType } from '@/stores/useJournalStore';
import { useThemeStore } from '@/stores/useThemeStore';
import { AlertCircle, CloudRain, Coffee, Flame, Frown, Heart, Meh, Shield, Smile, Sparkles, Sun, Zap } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface MoodBadgeProps {
    mood: MoodType;
}

export const MoodBadge: React.FC<MoodBadgeProps> = ({ mood }) => {
    const { theme } = useThemeStore();
    const moodColors = theme === 'dark' ? Colors.dark.mood : Colors.oceanCalm.mood;

    const getMoodConfig = (m: MoodType) => {
        const color = moodColors[m] || '#ccc';
        switch (m) {
            case 'happy': return { color, icon: Smile, label: 'Happy' };
            case 'calm': return { color, icon: Sparkles, label: 'Calm' };
            case 'perplexed': return { color, icon: Meh, label: 'Perplexed' };
            case 'jealous': return { color, icon: AlertCircle, label: 'Jealous' };
            case 'sad': return { color, icon: Frown, label: 'Sad' };
            case 'excited': return { color, icon: Zap, label: 'Excited' };
            case 'grateful': return { color, icon: Heart, label: 'Grateful' };
            case 'tired': return { color, icon: Coffee, label: 'Tired' };
            case 'anxious': return { color, icon: CloudRain, label: 'Anxious' };
            case 'confident': return { color, icon: Shield, label: 'Confident' };
            case 'loving': return { color, icon: Heart, label: 'Loving' };
            case 'bored': return { color, icon: Coffee, label: 'Bored' };
            case 'frustrated': return { color, icon: AlertCircle, label: 'Frustrated' };
            case 'proud': return { color, icon: Zap, label: 'Proud' };
            case 'hopeful': return { color, icon: Sun, label: 'Hopeful' };
            case 'lonely': return { color, icon: CloudRain, label: 'Lonely' };
            case 'angry': return { color, icon: Flame, label: 'Angry' };
            default: return { color: '#f0f0f0', icon: Sparkles, label: mood };
        }
    };

    const config = getMoodConfig(mood);
    const Icon = config.icon;

    return (
        <View style={[styles.container, { backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.1)' : '#ffffff' }]}>
            <View style={[styles.iconContainer, { backgroundColor: config.color }]}>
                <Icon size={12} color="#1a1a1a" />
            </View>
            <Text style={[styles.text, { color: theme === 'dark' ? '#eee' : '#666' }]}>{config.label}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 6,
        borderRadius: 12,
        alignSelf: 'flex-start',
        // borderWidth: 1,
        // borderColor: '#f0f0f0'
    },
    iconContainer: {
        padding: 4,
        borderRadius: 8,
        marginRight: 8,
    },
    text: {
        fontSize: 12,
        fontWeight: '600',
        color: '#666',
        textTransform: 'uppercase',
    },
});
