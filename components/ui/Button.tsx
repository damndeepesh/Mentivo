import { Colors } from '@/constants/Colors';
import React from 'react';
import { StyleSheet, Text, TextStyle, TouchableOpacity, TouchableOpacityProps, ViewStyle } from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    label: string;
    icon?: React.ReactNode;
    containerStyle?: ViewStyle;
    textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({
    variant = 'primary',
    label,
    icon,
    style,
    textStyle,
    disabled,
    ...props
}) => {

    const getBackgroundColor = () => {
        if (disabled) return '#e0e0e0';
        switch (variant) {
            case 'primary': return Colors.oceanCalm.text; // Dark button for contrast on light bg
            case 'secondary': return Colors.oceanCalm.secondary;
            case 'outline': return 'transparent';
            case 'ghost': return 'transparent';
            default: return Colors.oceanCalm.primary;
        }
    };

    const getTextColor = () => {
        if (disabled) return '#a0a0a0';
        switch (variant) {
            case 'primary': return '#ffffff';
            case 'secondary': return Colors.oceanCalm.text;
            case 'outline': return Colors.oceanCalm.text;
            case 'ghost': return Colors.oceanCalm.text;
            default: return '#000000';
        }
    };

    const getBorder = () => {
        if (variant === 'outline') return { borderWidth: 1, borderColor: Colors.oceanCalm.text };
        return {};
    };

    return (
        <TouchableOpacity
            style={[
                styles.container,
                { backgroundColor: getBackgroundColor() },
                getBorder(),
                style
            ]}
            disabled={disabled}
            activeOpacity={0.8}
            {...props}
        >
            {icon && React.cloneElement(icon as React.ReactElement<any>, { color: getTextColor(), size: 20, style: { marginRight: 8 } })}
            <Text style={[styles.text, { color: getTextColor() }, textStyle]}>
                {label}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 14,
        paddingHorizontal: 24,
        borderRadius: 30, // Pill shape
    },
    text: {
        fontSize: 16,
        fontWeight: '600',
        letterSpacing: 0.5,
    },
});
