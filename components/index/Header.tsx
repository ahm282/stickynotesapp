import React from "react";
import { View } from "react-native";
import { useTheme } from "@/theme/themeProvider";
import StyledText from "@/components/ui/StyledText";
import { FontAwesome6 } from "@expo/vector-icons";

interface HeaderProps {
    title: string;
    subtitle: string;
}

export const Header = ({ title, subtitle }: HeaderProps) => {
    const theme = useTheme();

    return (
        <View style={{ paddingVertical: 15 }}>
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
                    {title}
                </StyledText>
            </View>
            <StyledText
                style={{
                    fontSize: 14,
                    color: theme.text,
                }}>
                {subtitle}
            </StyledText>
        </View>
    );
};
