import React, { useState, useRef } from "react";
import { View, StyleSheet, TouchableOpacity, Modal, TouchableWithoutFeedback, Animated } from "react-native";
import { useTheme } from "@/theme/themeProvider";
import { Check, SwatchBook } from "lucide-react-native";

interface ColorSelectorProps {
    selectedColor: string;
    onSelectColor: (color: string) => void;
}

const ColorSelector: React.FC<ColorSelectorProps> = ({ selectedColor, onSelectColor }) => {
    const theme = useTheme();
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const scaleAnim = useRef(new Animated.Value(0)).current;
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const colorOptions = ["yellow", "red", "green", "blue", "purple", "orange"];

    const showMenu = () => {
        setIsMenuVisible(true);
        Animated.parallel([
            Animated.spring(scaleAnim, {
                toValue: 1,
                useNativeDriver: true,
                friction: 10,
                tension: 70,
                velocity: 3,
            }),
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 120,
                useNativeDriver: true,
            }),
        ]).start();
    };

    const hideMenu = () => {
        Animated.parallel([
            Animated.timing(scaleAnim, {
                toValue: 0,
                duration: 100,
                useNativeDriver: true,
            }),
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 80,
                useNativeDriver: true,
            }),
        ]).start(() => {
            setIsMenuVisible(false);
        });
    };

    const handleColorSelect = (color: string) => {
        onSelectColor(color);
        hideMenu();
    };

    // Get the actual color value from the theme based on the color key
    const getColorValue = (colorKey: string) => {
        return theme[colorKey as keyof typeof theme] || theme.yellow;
    };

    return (
        <View>
            <TouchableOpacity
                style={[styles.colorIndicator, { backgroundColor: getColorValue(selectedColor) }]}
                onPress={showMenu}>
                <SwatchBook
                    size={16}
                    color='#FFF'
                />
            </TouchableOpacity>

            <Modal
                transparent
                visible={isMenuVisible}
                animationType='none'
                onRequestClose={hideMenu}>
                <TouchableWithoutFeedback onPress={hideMenu}>
                    <View style={styles.modalOverlay}>
                        <TouchableWithoutFeedback>
                            <Animated.View
                                style={[
                                    styles.colorMenu,
                                    {
                                        backgroundColor: theme.card,
                                        opacity: fadeAnim,
                                        transform: [{ scale: scaleAnim }],
                                    },
                                ]}>
                                <View style={styles.colorOptionsContainer}>
                                    {colorOptions.map((colorKey) => (
                                        <TouchableOpacity
                                            key={colorKey}
                                            style={[styles.colorOption, { backgroundColor: getColorValue(colorKey) }]}
                                            onPress={() => handleColorSelect(colorKey)}>
                                            {selectedColor === colorKey && (
                                                <Check
                                                    size={16}
                                                    color='#FFF'
                                                />
                                            )}
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            </Animated.View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    colorIndicator: {
        width: 32,
        height: 32,
        borderRadius: "50%",
        justifyContent: "center",
        alignItems: "center",
    },
    modalOverlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    colorMenu: {
        padding: 12,
        borderRadius: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        position: "absolute",
        top: 120,
        right: 20,
    },
    colorOptionsContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        width: 150,
    },
    colorOption: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        margin: 6,
    },
});

export default ColorSelector;
