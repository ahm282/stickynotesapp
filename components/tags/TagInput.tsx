import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import { Plus } from "lucide-react-native";
import Toast from "react-native-toast-message";
import { useTheme } from "@/theme/themeProvider";

interface TagInputProps {
    onAddTag: (tagName: string) => Promise<void>;
}

export const TagInput = ({ onAddTag }: TagInputProps) => {
    const theme = useTheme();
    const [newTagName, setNewTagName] = useState("");

    const handleAddTag = () => {
        if (newTagName.trim()) {
            onAddTag(newTagName.trim())
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

    return (
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
                    size={16}
                    color={theme.background}
                />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
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
});

export default TagInput;
