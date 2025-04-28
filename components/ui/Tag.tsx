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
                styles.tagWrapper,
                size === "sm" ? styles.smallTag : styles.mediumTag,
                selected ? { backgroundColor: theme.tint } : { backgroundColor: theme.tagBackground },
            ]}>
            <View style={styles.tagContentLayout}>
                <TagIcon
                    size={size === "sm" ? 8 : 14}
                    color={selected ? theme.background : theme.icon}
                    style={[styles.tagIcon, size === "sm" ? styles.smallTagIcon : styles.mediumTagIcon]}
                />
                <StyledText
                    style={[
                        styles.tagLabel,
                        size === "sm" ? styles.smallTagText : styles.mediumTagText,
                        { color: selected ? theme.background : theme.icon },
                    ]}>
                    {text}
                </StyledText>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    tagWrapper: {
        borderRadius: 16,
        alignItems: "center",
        justifyContent: "center",
    },
    smallTag: {
        paddingVertical: 4,
        paddingHorizontal: 10,
        marginHorizontal: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    mediumTag: {
        paddingVertical: 7,
        paddingHorizontal: 14,
        marginHorizontal: 2,
        justifyContent: "center",
        alignItems: "center",
    },
    tagContentLayout: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    tagIcon: {
        marginEnd: 7,
    },
    smallTagIcon: {
        marginTop: 1,
    },
    mediumTagIcon: {
        marginTop: 1,
    },
    tagLabel: {
        fontFamily: "Poppins_400Regular",
        lineHeight: 20,
    },
    smallTagText: {
        fontSize: 12,
    },
    mediumTagText: {
        fontSize: 14,
    },
});

export default Tag;
