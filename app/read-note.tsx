import React, { useRef, useState } from "react";
import { View, StyleSheet, TouchableOpacity, ScrollView, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@/theme/themeProvider";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useNotes } from "@/context/NotesContext";
import { useTags } from "@/context/TagsContext";
import { ArrowLeft, Edit, Trash2, Archive } from "lucide-react-native";
import StyledText from "@/components/ui/StyledText";
import StaticTag from "@/components/ui/StaticTag";
import NoteOptionsMenu from "@/components/ui/NoteOptionsMenu";

export default function ReadNote() {
    const theme = useTheme();
    const router = useRouter();
    const { notes, deleteNote, archiveNote, unarchiveNote } = useNotes();
    const { tags } = useTags();
    const [menuVisible, setMenuVisible] = useState(false);
    const menuButtonRef = useRef<View>(null);
    const [menuPosition, setMenuPosition] = useState<{ x: number; y: number } | undefined>(undefined);

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

    // Handle edit button press
    const handleEdit = () => {
        if (noteId) {
            router.push({
                pathname: "/edit-note",
                params: { noteId },
            });
        }
    };

    // Handle delete button press
    const handleDelete = async () => {
        if (noteId) {
            await deleteNote(noteId);
            router.back();
        }
    };

    // Handle archive button press
    const handleArchiveToggle = async () => {
        if (noteId && note) {
            if (note.isArchived) {
                await unarchiveNote(noteId);
            } else {
                await archiveNote(noteId);
            }
            router.back();
        }
    };

    // Function to show options menu
    const showOptionsMenu = () => {
        if (menuButtonRef.current) {
            menuButtonRef.current.measure((x, y, width, height, pageX, pageY) => {
                setMenuPosition({
                    x: 20, // Adjust as needed
                    y: pageY + height,
                });
                setMenuVisible(true);
            });
        } else {
            setMenuVisible(true);
        }
    };

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

                {/* Action buttons */}
                <View style={styles.noteActions}>
                    <StyledText style={[styles.noteDate, { color: theme.text }]}>{noteDate}</StyledText>
                    <View style={styles.actionButtons}>
                        <TouchableOpacity
                            style={styles.actionButton}
                            onPress={handleEdit}>
                            <Edit
                                size={22}
                                color={theme.tint}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.actionButton}
                            onPress={handleArchiveToggle}>
                            <Archive
                                size={22}
                                color={theme.archive}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            ref={menuButtonRef}
                            style={styles.actionButton}
                            onPress={showOptionsMenu}>
                            <Trash2
                                size={22}
                                color={theme.destructive}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <View style={styles.noteContent}>
                <View style={[styles.titleContainer, { borderBottomColor: theme.secondary }]}>
                    <StyledText
                        style={[
                            styles.noteTitle,
                            { color: theme.text, borderBottomColor: "transparent", width: "90%" },
                        ]}
                        selectable={true}>
                        {noteTitle}
                    </StyledText>

                    {/* Display tags for this note - more subtle, smaller, on one line */}
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
                                            selected={false}
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

            {/* Options menu */}
            <NoteOptionsMenu
                visible={menuVisible}
                onClose={() => setMenuVisible(false)}
                onDelete={handleDelete}
                onEdit={handleEdit}
                onArchive={handleArchiveToggle}
                menuPosition={menuPosition}
                isArchived={note?.isArchived}
            />
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
    noteActions: {
        flexDirection: "row",
        alignItems: "center",
    },
    actionButtons: {
        flexDirection: "row",
        marginLeft: 12,
    },
    actionButton: {
        padding: 8,
        marginLeft: 4,
    },
    noteDate: {
        fontSize: 16,
        marginTop: 5,
        fontFamily: "Poppins_700Bold",
    },
    noteContent: {
        flex: 1,
        padding: 16,
        rowGap: 8,
    },
    titleContainer: {
        borderBottomWidth: 1,
        marginBottom: 16,
    },
    noteTitle: {
        fontSize: 24,
        fontFamily: "Poppins_700Bold",
        paddingVertical: 12,
        borderBottomWidth: 1,
    },
    tagsContainer: {
        marginBottom: 12,
        flexDirection: "row",
        alignItems: "center",
    },
    tagWrapper: {
        marginRight: 4,
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
