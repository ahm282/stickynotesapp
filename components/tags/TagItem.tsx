import React, { useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import { Edit, Trash2, Check, X, TagIcon } from "lucide-react-native";
import StyledText from "@/components/ui/StyledText";
import Toast from "react-native-toast-message";
import { useTheme } from "@/theme/themeProvider";

interface TagItemProps {
    id: string;
    name: string;
    onUpdateTag: (id: string, name: string) => Promise<void>;
    onDeleteTag: (id: string) => Promise<void>;
}

const TagItem = ({ id, name, onUpdateTag, onDeleteTag }: TagItemProps) => {
    const theme = useTheme();
    const [isEditing, setIsEditing] = useState(false);
    const [editingName, setEditingName] = useState(name);
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    // Update editingName when name prop changes
    useEffect(() => {
        if (!isEditing) {
            setEditingName(name);
        }
    }, [name, isEditing]);

    const startEditing = () => {
        setIsEditing(true);
        setEditingName(name);
    };

    const cancelEditing = () => {
        setIsEditing(false);
        setEditingName(name);
    };

    const saveTagEdit = async () => {
        const trimmedName = editingName.trim();
        if (!trimmedName) {
            Toast.show({
                type: "error",
                text1: "Error",
                text2: "Tag name cannot be empty.",
            });
            return;
        }

        if (trimmedName === name) {
            setIsEditing(false);
            return;
        }

        setIsSubmitting(true);
        try {
            await onUpdateTag(id, trimmedName);
            setIsEditing(false);
            Toast.show({
                type: "success",
                text1: "Tag Updated",
                text2: "Tag has been updated successfully.",
            });
        } catch (error: any) {
            Toast.show({
                type: "error",
                text1: "Error",
                text2: error.message || "Failed to update tag.",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDeleteTag = async () => {
        setIsSubmitting(true);
        try {
            await onDeleteTag(id);
            Toast.show({
                type: "success",
                text1: "Tag Deleted",
                text2: "The tag has been removed.",
            });
        } catch (error: any) {
            Toast.show({
                type: "error",
                text1: "Error",
                text2: error.message || "Failed to delete tag.",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <View style={[styles.tagItemCard, { backgroundColor: theme.card }]}>
            {isEditing ? (
                // Editing mode
                <View style={styles.tagEditForm}>
                    <TextInput
                        style={[styles.tagEditField, { color: theme.text }]}
                        value={editingName}
                        onChangeText={setEditingName}
                        autoFocus
                        editable={!isSubmitting}
                    />
                    <View style={styles.tagEditControls}>
                        <TouchableOpacity
                            style={[styles.actionButton, isSubmitting && styles.disabledButton]}
                            onPress={saveTagEdit}
                            disabled={isSubmitting}>
                            <Check
                                size={22}
                                color={isSubmitting ? theme.disabled : "#4CAF50"}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.actionButton, isSubmitting && styles.disabledButton]}
                            onPress={cancelEditing}
                            disabled={isSubmitting}>
                            <X
                                size={22}
                                color={isSubmitting ? theme.disabled : "#FF2525"}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            ) : (
                // Display mode
                <>
                    <View style={styles.tagDisplayContent}>
                        <TagIcon
                            size={16}
                            color={theme.icon}
                            style={{ marginEnd: 16 }}
                        />
                        <StyledText style={[styles.tagDisplayName, { color: theme.text }]}>{name}</StyledText>
                    </View>
                    <View style={styles.tagActionButtons}>
                        <TouchableOpacity
                            style={[styles.actionButton, isSubmitting && styles.disabledButton]}
                            onPress={startEditing}
                            disabled={isSubmitting}>
                            <Edit
                                size={22}
                                color={isSubmitting ? theme.disabled : "#2196F3"}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.actionButton, isSubmitting && styles.disabledButton]}
                            onPress={handleDeleteTag}
                            disabled={isSubmitting}>
                            <Trash2
                                size={22}
                                color={isSubmitting ? theme.disabled : "#FF2525"}
                            />
                        </TouchableOpacity>
                    </View>
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    tagItemCard: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 14,
        borderRadius: 10,
        marginBottom: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    tagDisplayContent: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
    },
    tagDisplayName: {
        fontSize: 16,
        fontFamily: "Poppins_400Regular",
    },
    tagActionButtons: {
        flexDirection: "row",
        alignItems: "center",
    },
    actionButton: {
        padding: 8,
        marginLeft: 4,
    },
    disabledButton: {
        opacity: 0.5,
    },
    tagEditForm: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
    },
    tagEditField: {
        flex: 1,
        fontSize: 16,
        fontFamily: "Poppins_400Regular",
        paddingVertical: 8,
    },
    tagEditControls: {
        flexDirection: "row",
        alignItems: "center",
    },
});

export default TagItem;
