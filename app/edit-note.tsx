import React, { useState } from "react";
import { View, TextInput, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@/theme/themeProvider";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useNotes } from "@/context/NotesContext";
import StyledText from "@/components/ui/StyledText";
import ColorSelector from "@/components/ui/ColorSelector";
import TagSelector from "@/components/ui/TagSelector";
import NotebookTextInput from "@/components/ui/NotebookTextInput";
import { ArrowLeft } from "lucide-react-native";

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
        router.back();
        return null;
    }

    const [title, setTitle] = useState(note.title);
    const [content, setContent] = useState(note.content);
    const [selectedColor, setSelectedColor] = useState(note.color);
    const [selectedTagIds, setSelectedTagIds] = useState<string[]>(note.tagIds || []);

    const handleSave = async () => {
        if (title.trim() || content.trim()) {
            if (noteId !== null && note) {
                await updateNote(
                    noteId,
                    title.trim() || "Untitled note",
                    content.trim(),
                    selectedTagIds,
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
                    <ArrowLeft
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

            <ScrollView style={styles.scrollContainer}>
                <View style={styles.content}>
                    <View
                        style={[styles.topInputSection, { borderBottomColor: theme.secondary }]}>
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
                    
                    {/* Add tag selector */}
                    <TagSelector 
                        selectedTagIds={selectedTagIds}
                        onTagsChange={setSelectedTagIds}
                    />
                    
                    <NotebookTextInput
                        placeholder='Write your note here...'
                        placeholderTextColor={theme.icon}
                        value={content}
                        onChangeText={setContent}
                        autoFocus
                    />
                </View>
            </ScrollView>
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
    scrollContainer: {
        flex: 1,
    },
    content: {
        flex: 1,
        padding: 16,
        rowGap: 12,
    },
    topInputSection: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottomWidth: 1,
        marginBottom: 16,
    },
    titleInput: {
        fontSize: 24,
        fontFamily: "Poppins_700Bold",
        paddingVertical: 12,
        borderBottomWidth: 1,
    },
});
