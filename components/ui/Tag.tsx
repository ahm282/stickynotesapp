import { View, StyleSheet, TouchableOpacity } from "react-native";
import { TagIcon } from "lucide-react-native";
import { useTheme } from "@/theme/themeProvider";
import StyledText from "./StyledText";

interface TagProps {
    id: string;
    text: string;
    size?: "sm" | "md";
    onPress?: (id: string) => void;
    selected?: boolean;
}

export const Tag = ({ id, text, size = "sm", onPress, selected = false }: TagProps) => {
    const theme = useTheme();

    return (
        <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => onPress?.(id)}
            style={[
                styles.container,
                size === "sm" ? styles.smallTag : styles.mediumTag,
                selected ? { backgroundColor: theme.tint } : { backgroundColor: theme.tagBackground },
            ]}>
            <View style={styles.tagContent}>
                <TagIcon
                    size={size === "sm" ? 8 : 14}
                    color={selected ? theme.background : theme.icon}
                    style={styles.icon}
                />
                <StyledText
                    style={[
                        styles.text,
                        size === "sm" ? styles.smallText : styles.mediumText,
                        { color: selected ? theme.background : theme.icon },
                    ]}>
                    {text}
                </StyledText>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 16,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center",
    },
    smallTag: {
        paddingVertical: 2,
        paddingHorizontal: 10,
    },
    mediumTag: {
        paddingVertical: 6,
        paddingHorizontal: 12,
    },
    tagContent: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    icon: {
        marginEnd: 5,
    },
    text: {
        fontFamily: "Poppins_400Regular",
        lineHeight: 20,
    },
    smallText: {
        fontSize: 12,
    },
    mediumText: {
        fontSize: 14,
    },
});

export default Tag;
