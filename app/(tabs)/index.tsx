import React from "react";
import { View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TagsFilter } from "@/components/TagsFilter";
import { useTheme } from "@/theme/themeProvider";
import StyledText from "@/components/ui/StyledText";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

export default function Index() {
    const theme = useTheme();

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
            <View style={styles.container}>
                <View style={{ marginBottom: 15 }}>
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",

                            marginBottom: 16,
                        }}>
                        <FontAwesome6
                            name='sticky-note'
                            size={36}
                            color={theme.tint}
                        />
                        <StyledText
                            bold
                            style={{
                                fontSize: 30,
                                color: theme.text,
                                marginTop: 5,
                            }}>
                            {"  "}
                            Sticky Notes
                        </StyledText>
                    </View>
                    <StyledText
                        style={{
                            fontSize: 14,
                            color: theme.text,
                        }}>
                        Capture your thoughts and ideas with ease.
                    </StyledText>
                </View>
                <TagsFilter />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: "5%",
        paddingHorizontal: "5%",
    },
});
