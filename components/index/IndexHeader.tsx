import React from "react";
import { View } from "react-native";
import { useTheme } from "@/theme/themeProvider";
import StyledText from "@/components/ui/StyledText";
import { FontAwesome6 } from "@expo/vector-icons";

export const IndexHeader = () => {
    const theme = useTheme();

    return (
        <View style={{ paddingVertical: 15, paddingHorizontal: 15 }}>
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 5,
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
    );
};
