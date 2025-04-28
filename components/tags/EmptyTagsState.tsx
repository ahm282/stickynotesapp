import React from "react";
import { View, StyleSheet } from "react-native";
import StyledText from "@/components/ui/StyledText";
import { useTheme } from "@/theme/themeProvider";

export const EmptyTagsState = () => {
    const theme = useTheme();

    return (
        <View style={styles.emptyStateContainer}>
            <StyledText style={{ color: theme.text, textAlign: "center" }}>
                No tags yet. Create your first tag!
            </StyledText>
        </View>
    );
};

const styles = StyleSheet.create({
    emptyStateContainer: {
        marginTop: 40,
        alignItems: "center",
        justifyContent: "center",
    },
});

export default EmptyTagsState;
