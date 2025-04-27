import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@/theme/themeProvider";
import StyledText from "@/components/ui/StyledText";
import { Header } from "@/components/index/Header";

export default function Tags() {
    const theme = useTheme();

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
            <Header
                title='Tags'
                subtitle='Organize your notes with tags.'
            />

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.contentContainer}>
                <StyledText
                    bold
                    style={{
                        fontSize: 18,
                        color: theme.text,
                        textAlign: "center",
                    }}>
                    Coming Soon!
                </StyledText>
                <StyledText
                    style={{
                        fontSize: 14,
                        color: theme.text,
                        textAlign: "center",
                        marginTop: 8,
                    }}>
                    The tags management feature is under development.
                </StyledText>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: "10%",
        paddingHorizontal: 16,
    },
    contentContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 16,
    },
});
