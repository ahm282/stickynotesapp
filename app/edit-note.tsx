import React, { useState } from "react";
import { View, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@/theme/themeProvider";
import { useRouter, useLocalSearchParams } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { useNotes } from "@/context/NotesContext";
import StyledText from "@/components/ui/StyledText";
import ColorSelector from "@/components/ui/ColorSelector";

export default function EditNote() {
    const theme = useTheme();
    const router = useRouter();
    const { updateNote, notes } = useNotes();

    // Check if noteId is passed
    const params = useLocalSearchParams();
    const noteId = params.noteId as string | null;

    // Find the note with the given id
    const note = notes.find((note) => note.id === noteId);

    // If note is not found, navigate back
    if (!note) {
        console.log("Note not found, navigating back");
        router.back();
        return null;
    }

    const [title, setTitle] = useState(note.title);
    const [content, setContent] = useState(note.content);
    const [selectedColor, setSelectedColor] = useState(note.color);

    const handleSave = async () => {
        if (title.trim() || content.trim()) {
            if (noteId !== null && note) {
                await updateNote(
                    noteId,
                    title.trim() || "Untitled note",
                    content.trim(),
                    note.tagIds || [],
                    selectedColor!
                );
            }

            // Navigate back after saving
            router.back();
        } else {
            // Don't save empty notes
            router.back();
        }
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => router.back()}
                    style={styles.backButton}>
                    <MaterialIcons
                        name='arrow-back'
                        size={24}
                        color={theme.text}
                    />
                </TouchableOpacity>
                <StyledText style={[styles.headerTitle, { color: theme.text }]}>Edit Note</StyledText>
                <TouchableOpacity
                    onPress={handleSave}
                    style={styles.saveButton}>
                    <StyledText style={{ color: theme.tint }}>Save</StyledText>
                </TouchableOpacity>
            </View>

            <View style={styles.content}>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        borderBottomWidth: 1,
                        borderBottomColor: theme.secondary,
                    }}>
                    <TextInput
                        placeholder='Title'
                        placeholderTextColor={theme.icon}
                        style={[
                            styles.titleInput,
                            { color: theme.text, borderBottomColor: "transparent", width: "90%" },
                        ]}
                        value={title}
                        onChangeText={setTitle}
                    />
                    <ColorSelector
                        selectedColor={selectedColor!}
                        onSelectColor={setSelectedColor}
                    />
                </View>
                <TextInput
                    placeholder='Write your note here...'
                    placeholderTextColor={theme.icon}
                    style={[styles.contentInput, { color: theme.text }]}
                    multiline
                    value={content}
                    onChangeText={setContent}
                    autoFocus
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 16,
        paddingVertical: 10,
    },
    backButton: {
        padding: 8,
    },
    headerTitle: {
        fontSize: 18,
        fontFamily: "Poppins_700Bold",
    },
    saveButton: {
        padding: 8,
    },
    content: {
        flex: 1,
        padding: 16,
    },
    titleInput: {
        fontSize: 24,
        fontFamily: "Poppins_700Bold",
        paddingVertical: 12,
        borderBottomWidth: 1,
        marginBottom: 16,
    },
    contentInput: {
        fontSize: 16,
        fontFamily: "Poppins_400Regular",
        flex: 1,
        textAlignVertical: "top",
    },
});
