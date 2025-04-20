import React from "react";
import { Text, TextProps, TextStyle } from "react-native";

interface StyledTextProps extends TextProps {
    bold?: boolean;
}

export const StyledText = ({ style, bold = false, ...props }: StyledTextProps) => {
    return (
        <Text
            {...props}
            style={[{ fontFamily: bold ? "Poppins_700Bold" : "Poppins_400Regular" }, style as TextStyle]}
        />
    );
};

export default StyledText;
