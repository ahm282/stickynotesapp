import React from "react";
import { TouchableOpacity, View, StyleSheet, ViewStyle, TextStyle, StyleProp } from "react-native";
import { useTheme } from "@/theme/themeProvider";
import StyledText from "./StyledText";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

type TagProps = {
    id: string;
    text: string;
    size?: "sm" | "md" | "lg";
    onPress?: () => void;
    disabled?: boolean;
    selected?: boolean;
    style?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
};

export const Tag = ({
    id,
    text,
    size = "md",
    onPress,
    disabled = false,
    selected = false,
    style,
    textStyle,
}: TagProps) => {
    const theme = useTheme();
    const sizeStyle = getSizeStyle(size);

    // Use theme colors
    const tagColor = theme.tint;
    const secondaryColor = theme.secondary;
    const textColor = theme.text;
    const tagStyle = {
        backgroundColor: selected ? tagColor : secondaryColor,
    };
    const textStyleColor = {
        color: selected ? theme.background : theme.text,
    };

    const shouldShowIcon = text !== "All" && text !== "All notes";

    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={disabled}
            style={[styles.container, tagStyle, disabled && styles.disabled, style]}
            activeOpacity={0.7}
            id={id}>
            <View style={[styles.tagContainer, sizeStyle.padding]}>
                {shouldShowIcon && (
                    <MaterialCommunityIcons
                        name='tag-outline'
                        size={20}
                        style={textStyleColor}
                    />
                )}
                <StyledText style={[styles.text, textStyleColor, sizeStyle.font, textStyle]}>{text}</StyledText>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        alignSelf: "flex-start",
        borderRadius: 20,
    },
    disabled: {
        opacity: 0.5,
    },
    tagContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        columnGap: 4,
    },
    text: {
        includeFontPadding: false,
        textAlignVertical: "center",
    },
});

const getSizeStyle = (size: string): { padding: ViewStyle; font: TextStyle } => {
    switch (size) {
        case "sm":
            return {
                padding: { paddingVertical: 4, paddingHorizontal: 8 },
                font: { fontSize: 12, lineHeight: 14 },
            };
        case "md":
            return {
                padding: { paddingVertical: 8, paddingHorizontal: 20 },
                font: { fontSize: 14, lineHeight: 18 },
            };
        case "lg":
            return {
                padding: { paddingVertical: 10, paddingHorizontal: 20 },
                font: { fontSize: 18, lineHeight: 22 },
            };
        default:
            return {
                padding: { paddingVertical: 7, paddingHorizontal: 14 },
                font: { fontSize: 14, lineHeight: 18 },
            };
    }
};

export default Tag;
