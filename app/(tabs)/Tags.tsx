import React, { useState } from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@/theme/themeProvider";
import { Header } from "@/components/index/Header";
import { useTags } from "@/context/TagsContext";
import { Plus, Trash2, Edit, Check, TagIcon, X } from "lucide-react-native";
import StyledText from "@/components/ui/StyledText";
import Toast from "react-native-toast-message";

export default function Tags() {
    const theme = useTheme();
    const { tags, addTag, updateTag, deleteTag } = useTags();

    const [newTagName, setNewTagName] = useState("");
    const [editingTag, setEditingTag] = useState<string | null>(null);
    const [editingName, setEditingName] = useState("");

    const handleAddTag = () => {
        if (newTagName.trim()) {
            addTag(newTagName.trim())
                .then(() => {
                    setNewTagName("");
                    Toast.show({
                        type: "success",
                        text1: "Tag Added",
                        text2: "New tag has been created successfully.",
                    });
                })
                .catch((error) => {
                    console.error("Error adding tag:", error);
                    Toast.show({
                        type: "error",
                        text1: "Error",
                        text2: "Failed to create tag.",
                    });
                });
        } else {
            Toast.show({
                type: "error",
                text1: "Error",
                text2: "Tag name cannot be empty.",
            });
        }
    };

    const startEditing = (id: string, name: string) => {
        setEditingTag(id);
        setEditingName(name);
    };

    const cancelEditing = () => {
        setEditingTag(null);
    };

    const saveTagEdit = (id: string) => {
        if (editingName.trim()) {
            updateTag(id, editingName)
                .then(() => {
                    setEditingTag(null);
                    Toast.show({
                        type: "success",
                        text1: "Tag Updated",
                        text2: "Tag has been updated successfully.",
                    });
                })
                .catch((error) => {
                    console.error("Error updating tag:", error);
                    Toast.show({
                        type: "error",
                        text1: "Error",
                        text2: "Failed to update tag.",
                    });
                });
        } else {
            Toast.show({
                type: "error",
                text1: "Error",
                text2: "Tag name cannot be empty.",
            });
        }
    };

    const handleDeleteTag = (id: string) => {
        deleteTag(id)
            .then(() => {
                Toast.show({
                    type: "delete",
                    text1: "Tag Deleted",
                    text2: "The tag has been removed.",
                });
            })
            .catch((error) => {
                console.error("Error deleting tag:", error);
                Toast.show({
                    type: "error",
                    text1: "Error",
                    text2: "Failed to delete tag.",
                });
            });
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
            <Header
                title='Tags'
                subtitle='Organize your notes with tags.'
            />

            {/* Add new tag section */}
            <View style={[styles.addTagContainer, { backgroundColor: theme.card }]}>
                <TextInput
                    placeholder='Add a new tag...'
                    placeholderTextColor={theme.icon}
                    style={[styles.tagInput, { color: theme.text }]}
                    value={newTagName}
                    onChangeText={setNewTagName}
                />
                <TouchableOpacity
                    style={[styles.addButton, { backgroundColor: theme.tint }]}
                    onPress={handleAddTag}>
                    <Plus
                        size={22}
                        color={theme.background}
                    />
                </TouchableOpacity>
            </View>

            {/* Tags list */}
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.tagsListContainer}>
                {tags.length === 0 ? (
                    <View style={styles.emptyStateContainer}>
                        <StyledText style={{ color: theme.text, textAlign: "center" }}>
                            No tags yet. Create your first tag!
                        </StyledText>
                    </View>
                ) : (
                    tags.map((tag) => (
                        <View
                            key={tag.id}
                            style={[styles.tagItemContainer, { backgroundColor: theme.card }]}>
                            {editingTag === tag.id ? (
                                // Editing mode
                                <View style={styles.tagItemEdit}>
                                    <TextInput
                                        style={[styles.tagEditInput, { color: theme.text }]}
                                        value={editingName}
                                        onChangeText={setEditingName}
                                        autoFocus
                                    />
                                    <View style={styles.editButtonsContainer}>
                                        <TouchableOpacity
                                            style={styles.actionButton}
                                            onPress={() => saveTagEdit(tag.id)}>
                                            <Check
                                                size={22}
                                                color={"#4CAF50"}
                                            />
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={styles.actionButton}
                                            onPress={cancelEditing}>
                                            <X
                                                size={22}
                                                color={"#FF2525"}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            ) : (
                                // Display mode
                                <>
                                    <View style={styles.tagItemContent}>
                                        <TagIcon
                                            size={16}
                                            color={theme.icon}
                                            style={{ marginEnd: 16 }}
                                        />
                                        <StyledText style={[styles.tagName, { color: theme.text }]}>
                                            {tag.name}
                                        </StyledText>
                                    </View>
                                    <View style={styles.tagActionsContainer}>
                                        <TouchableOpacity
                                            style={styles.actionButton}
                                            onPress={() => startEditing(tag.id, tag.name)}>
                                            <Edit
                                                size={22}
                                                color={"#2196F3"}
                                            />
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={styles.actionButton}
                                            onPress={() => handleDeleteTag(tag.id)}>
                                            <Trash2
                                                size={22}
                                                color={"#FF2525"}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                </>
                            )}
                        </View>
                    ))
                )}
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
    addTagContainer: {
        flexDirection: "row",
        padding: 12,
        borderRadius: 10,
        marginBottom: 16,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    tagInput: {
        flex: 1,
        fontSize: 16,
        fontFamily: "Poppins_400Regular",
        paddingVertical: 8,
        paddingHorizontal: 4,
    },
    addButton: {
        width: 30,
        height: 30,
        borderRadius: 7,
        justifyContent: "center",
        alignItems: "center",
    },
    tagsListContainer: {
        paddingBottom: 20,
    },
    emptyStateContainer: {
        marginTop: 40,
        alignItems: "center",
        justifyContent: "center",
    },
    tagItemContainer: {
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
    tagItemContent: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
    },
    tagName: {
        fontSize: 16,
        fontFamily: "Poppins_400Regular",
    },
    tagActionsContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    actionButton: {
        padding: 8,
        marginLeft: 4,
    },
    tagItemEdit: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
    },
    tagEditInput: {
        flex: 1,
        fontSize: 16,
        fontFamily: "Poppins_400Regular",
        paddingVertical: 8,
    },
    editButtonsContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
});
