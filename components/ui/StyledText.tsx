import React from "react";
import { Text, TextProps } from "react-native";
import { TextStyle } from "react-native";
import { useTheme } from "@/theme/themeProvider";

interface StyledTextProps extends TextProps {
    bold?: boolean;
}

export const StyledText = ({ style, bold = false, ...props }: StyledTextProps) => {
    const theme = useTheme();
    const textColor = theme.text;

    return (
        <Text
            {...props}
            style={[
                {
                    fontFamily: bold ? "Poppins_700Bold" : "Poppins_400Regular",
                    color: textColor,
                },
                style as TextStyle,
            ]}
        />
    );
};

export default StyledText;
