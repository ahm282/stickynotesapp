import React, { useRef } from "react";
import { View, StyleSheet, TouchableOpacity, Modal, TouchableWithoutFeedback, Animated } from "react-native";
import { useTheme } from "@/theme/themeProvider";
import { Edit, Archive, Trash2 } from "lucide-react-native";
import StyledText from "./StyledText";

interface NoteOptionsMenuProps {
    visible: boolean;
    onClose: () => void;
    onDelete: () => void;
    onEdit?: () => void;
    onArchive?: () => void;
    menuPosition?: { x: number; y: number }; // Added position prop
    isArchived?: boolean;
}

const NoteOptionsMenu: React.FC<NoteOptionsMenuProps> = ({
    visible,
    onClose,
    onDelete,
    onEdit,
    onArchive,
    menuPosition,
    isArchived,
}) => {
    const theme = useTheme();
    const scaleAnim = useRef(new Animated.Value(0)).current;
    const fadeAnim = useRef(new Animated.Value(0)).current;

    // Animate menu when visibility changes
    React.useEffect(() => {
        if (visible) {
            Animated.parallel([
                Animated.spring(scaleAnim, {
                    toValue: 1,
                    useNativeDriver: true,
                    friction: 8,
                    tension: 70,
                    velocity: 3,
                }),
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 150,
                    useNativeDriver: true,
                }),
            ]).start();
        } else {
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
            ]).start();
        }
    }, [visible, scaleAnim, fadeAnim]);

    const handleAction = (action: () => void) => {
        action();
        onClose();
    };

    if (!visible) return null;

    return (
        <Modal
            transparent
            visible={visible}
            animationType='none'
            onRequestClose={onClose}>
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={styles.modalOverlay}>
                    <TouchableWithoutFeedback>
                        <Animated.View
                            style={[
                                styles.menuPopup,
                                {
                                    backgroundColor: theme.muted,
                                    borderColor: theme.borderColor,
                                    opacity: fadeAnim,
                                    transform: [{ scale: scaleAnim }],
                                    top: menuPosition?.y || 60, // Use menuPosition if provided
                                    right: menuPosition?.x || 20, // Use menuPosition if provided
                                },
                            ]}>
                            {onEdit && (
                                <TouchableOpacity
                                    style={[
                                        styles.menuOption,
                                        { borderBottomColor: theme.borderColor, borderBottomWidth: 1 },
                                    ]}
                                    onPress={() => handleAction(onEdit)}>
                                    <Edit
                                        size={18}
                                        color={"#4A90E2"}
                                    />
                                    <StyledText style={styles.menuOptionText}>Edit</StyledText>
                                </TouchableOpacity>
                            )}

                            {onArchive && (
                                <TouchableOpacity
                                    style={[
                                        styles.menuOption,
                                        { borderBottomColor: theme.borderColor, borderBottomWidth: 1 },
                                    ]}
                                    onPress={() => handleAction(onArchive)}>
                                    <Archive
                                        size={18}
                                        color={"#008080"}
                                    />
                                    <StyledText style={styles.menuOptionText}>
                                        {isArchived ? "Unarchive" : "Archive"}
                                    </StyledText>
                                </TouchableOpacity>
                            )}

                            <TouchableOpacity
                                style={[styles.menuOption, styles.deleteOption]}
                                onPress={() => handleAction(onDelete)}>
                                <Trash2
                                    size={18}
                                    color={theme.destructive}
                                />
                                <StyledText style={[styles.menuOptionText, { color: theme.destructive }]}>Delete</StyledText>
                            </TouchableOpacity>
                        </Animated.View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    menuPopup: {
        padding: 8,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        position: "absolute",
        top: 60,
        right: 20,
        width: 140,
    },
    menuOption: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
        paddingHorizontal: 12,
    },
    deleteOption: {
        marginTop: 4,
    },
    menuOptionText: {
        marginLeft: 10,
        fontSize: 14,
    },
});

export default NoteOptionsMenu;
