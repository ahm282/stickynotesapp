import React from "react";
import { TextInput, View, StyleSheet, TextInputProps } from "react-native";
import { useTheme } from "@/theme/themeProvider";

interface NotebookTextInputProps extends TextInputProps {
    lineHeight?: number;
    lineColor?: string;
}

const NotebookTextInput = ({ 
    lineHeight = 28, 
    lineColor,
    style,
    ...rest 
}: NotebookTextInputProps) => {
    const theme = useTheme();
    
    // Set default line color based on theme
    const defaultLineColor = theme.mode === "dark" 
        ? "rgba(255, 255, 255, 0.1)" 
        : "rgba(0, 0, 0, 0.05)";
    
    const actualLineColor = lineColor || defaultLineColor;
    
    return (
        <View style={styles.notebookWrapper}>
            {/* Background lines */}
            <View style={styles.ruledLinesContainer}>
                {/* Generate multiple lines based on container height */}
                {Array.from({ length: 100 }).map((_, index) => (
                    <View 
                        key={index} 
                        style={[
                            styles.notebookLine, 
                            { 
                                top: index * lineHeight + lineHeight, 
                                height: 1, 
                                backgroundColor: actualLineColor
                            }
                        ]} 
                    />
                ))}
            </View>
            
            {/* Actual text input */}
            <TextInput
                {...rest}
                multiline
                style={[
                    styles.notebookInput, 
                    { color: theme.text, lineHeight: lineHeight },
                    style
                ]}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    notebookWrapper: {
        position: "relative",
        flex: 1,
    },
    ruledLinesContainer: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1,
    },
    notebookLine: {
        position: "absolute",
        left: 0,
        right: 0,
    },
    notebookInput: {
        flex: 1,
        fontSize: 16,
        fontFamily: "Poppins_400Regular",
        zIndex: 2,
        backgroundColor: "transparent",
        textAlignVertical: "top",
        paddingTop: 0,
    },
});

export default NotebookTextInput;