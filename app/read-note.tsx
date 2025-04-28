import React from "react";
import { View, StyleSheet, TouchableOpacity, ScrollView, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@/theme/themeProvider";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useNotes } from "@/context/NotesContext";
import { useTags } from "@/context/TagsContext";
import { ArrowLeft } from "lucide-react-native";
import StyledText from "@/components/ui/StyledText";
import StaticTag from "@/components/ui/StaticTag";

export default function ReadNote() {
    const theme = useTheme();
    const router = useRouter();
    const { notes } = useNotes();
    const { tags } = useTags();

    // Check if noteId is passed
    const params = useLocalSearchParams();
    const noteId = params.noteId as string | null;

    // Find the note with the given id
    const note = notes.find((note) => note.id === noteId);

    // Set note title, date and content
    const noteTitle = note?.title || "Untitled Note";
    const noteDate = note?.updatedAt
        ? new Date(note.updatedAt).toLocaleDateString("nl-BE", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
          })
        : "";
    const noteContent = note?.content || "No content";

    // Get tags for this note
    const noteTags = note?.tagIds ? tags.filter((tag) => note.tagIds.includes(tag.id)) : [];

    // Split content into lines for rendering with notebook lines
    const contentLines = noteContent.split("\n");
    const lineHeight = 28; // Same as in NotebookTextInput component

    return (
        <SafeAreaView style={[styles.pageContainer, { backgroundColor: theme.background }]}>
            <View style={styles.noteHeader}>
                <TouchableOpacity
                    onPress={() => router.back()}
                    style={styles.backButton}>
                    <ArrowLeft
                        size={24}
                        color={theme.text}
                    />
                </TouchableOpacity>
                <StyledText style={[styles.noteDate, { color: theme.tint }]}>{noteDate}</StyledText>
            </View>

            <View style={styles.noteContent}>
                <View
                    style={{
                        borderBottomWidth: 1,
                        borderBottomColor: theme.secondary,
                        marginBottom: 16,
                    }}>
                    <StyledText
                        style={[
                            styles.noteTitle,
                            { color: theme.text, borderBottomColor: "transparent", width: "90%" },
                        ]}
                        selectable={true}>
                        {noteTitle}
                    </StyledText>

                    {/* Display tags for this note */}
                    {noteTags.length > 0 && (
                        <View style={styles.tagsContainer}>
                            <FlatList
                                horizontal
                                data={noteTags}
                                keyExtractor={(item) => `note-tag-${item.id}`}
                                renderItem={({ item }) => (
                                    <View style={styles.tagWrapper}>
                                        <StaticTag
                                            id={item.id}
                                            text={item.name}
                                            size='sm'
                                            selected={true}
                                        />
                                    </View>
                                )}
                                showsHorizontalScrollIndicator={false}
                            />
                        </View>
                    )}
                </View>

                {/* Notebook-style lined content ScrollView */}
                <ScrollView
                    style={styles.notebookScrollView}
                    showsVerticalScrollIndicator={false}>
                    <View style={styles.notebookContent}>
                        {/* Background lines - first line removed */}
                        <View style={styles.notebookRuledLines}>
                            {Array.from({ length: Math.max(contentLines.length + 5, 20) }).map((_, index) => (
                                <View
                                    key={index}
                                    style={[
                                        styles.notebookLine,
                                        {
                                            // Start from the second line position
                                            top: (index + 1) * lineHeight,
                                            height: 1,
                                            backgroundColor:
                                                theme.mode === "dark"
                                                    ? "rgba(255, 255, 255, 0.1)"
                                                    : "rgba(0, 0, 0, 0.05)",
                                        },
                                    ]}
                                />
                            ))}
                        </View>

                        {/* Note content */}
                        <StyledText
                            selectable={true}
                            style={[
                                styles.noteBodyText,
                                {
                                    color: theme.text,
                                    lineHeight: lineHeight,
                                },
                            ]}>
                            {noteContent}
                        </StyledText>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    pageContainer: {
        flex: 1,
    },
    noteHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 16,
        paddingVertical: 10,
    },
    backButton: {
        padding: 8,
    },
    noteDate: {
        fontSize: 18,
        fontFamily: "Poppins_700Bold",
    },
    noteContent: {
        flex: 1,
        padding: 16,
        rowGap: 8,
    },
    noteTitle: {
        fontSize: 24,
        fontFamily: "Poppins_700Bold",
        paddingVertical: 12,
        borderBottomWidth: 1,
    },
    tagsContainer: {
        marginBottom: 12,
    },
    tagWrapper: {
        marginRight: 6,
    },
    notebookScrollView: {
        flex: 1,
    },
    notebookContent: {
        position: "relative",
        minHeight: 300,
        paddingBottom: 50,
    },
    notebookRuledLines: {
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
    noteBodyText: {
        fontSize: 16,
        fontFamily: "Poppins_400Regular",
        zIndex: 2,
        paddingTop: 0,
        marginTop: 0,
    },
});
