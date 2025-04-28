import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { useTheme } from "@/theme/themeProvider";
import { TagIcon } from "lucide-react-native";

interface MiniTagProps {
    text: string;
}

export const MiniTag = ({ text }: MiniTagProps) => {
    const theme = useTheme();

    // Use a short version of the tag if it's too long
    const displayText = text.length > 10 ? `${text.substring(0, 8)}...` : text;

    return (
        <View style={[styles.miniTagContainer, { backgroundColor: theme.tagBackground }]}>
            <TagIcon
                size={8}
                color={theme.text}
                style={{ marginRight: 2 }}
            />
            <Text
                numberOfLines={1}
                style={[styles.miniTagText, { color: theme.text }]}>
                {displayText}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    miniTagContainer: {
        borderRadius: 4,
        paddingHorizontal: 4,
        paddingVertical: 1,
        marginRight: 3,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        maxWidth: 80,
    },
    miniTagText: {
        marginTop: 1,
        fontSize: 8,
        fontFamily: "Poppins_400Regular",
    },
});

export default MiniTag;
