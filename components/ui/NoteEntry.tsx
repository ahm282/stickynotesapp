import React, { useMemo, useState, useRef } from "react";
import { View, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { useTheme } from "@/theme/themeProvider";
import { Note, useNotes } from "@/context/NotesContext";
import Entypo from "@expo/vector-icons/Entypo";
import StyledText from "@/components/ui/StyledText";
import truncateText from "@/util/TruncateNote";
import NoteOptionsMenu from "@/components/ui/NoteOptionsMenu";
import { router } from "expo-router";

interface NoteProps {
    note: Note;
}

export const NoteEntry = ({ note }: NoteProps) => {
    const theme = useTheme();
    const { deleteNote, archiveNote, unarchiveNote } = useNotes();
    const screenWidth = Dimensions.get("window").width;
    const noteWidth = (screenWidth - 60) / 2;
    const noteHeight = 230;
    const [menuVisible, setMenuVisible] = useState(false);
    const [menuPosition, setMenuPosition] = useState<{ x: number; y: number } | undefined>(undefined);
    const iconRef = useRef<View>(null);

    // Calculate truncated content once when note or dimensions change to avoid unnecessary re-renders
    const truncatedContent = useMemo(() => {
        return truncateText(note.content, noteWidth, noteHeight);
    }, [note.content, noteWidth, noteHeight]);

    // Get the color from the theme based on the note's color key
    const getNoteColor = () => {
        if (!note.color) return theme.card;
        return theme[note.color as keyof typeof theme] || theme.card;
    };

    const handleViewNote = () => {
        router.push({
            pathname: "/read-note",
            params: { noteId: note.id },
        });
    };

    const handleDelete = () => {
        deleteNote(note.id);
    };

    const handleEdit = () => {
        router.push({
            pathname: "/edit-note",
            params: { noteId: note.id },
        });
    };

    const handleArchiveToggle = async () => {
        if (note.isArchived) {
            await unarchiveNote(note.id);
        } else {
            await archiveNote(note.id);
        }
    };

    // Function to measure icon position and show menu
    const handleShowMenu = () => {
        if (iconRef.current) {
            iconRef.current.measure((x, y, width, height, pageX, pageY) => {
                setMenuPosition({
                    x: screenWidth - pageX - width,
                    y: pageY,
                });
                setMenuVisible(true);
            });
        } else {
            setMenuVisible(true);
        }
    };

    return (
        <TouchableOpacity
            onPress={() => handleViewNote()}
            activeOpacity={0.05}
            style={{
                ...styles.noteItem,
                backgroundColor: getNoteColor(),
                width: noteWidth,
            }}>
            <View key={note.id}>
                <View style={styles.noteHeader}>
                    <View>
                        <StyledText
                            style={{
                                ...styles.noteTitle,
                                color: theme.text,
                            }}
                            bold>
                            {note.title}
                        </StyledText>
                        <StyledText
                            style={{
                                ...styles.noteDate,
                                color: theme.tagText,
                            }}>
                            {new Date(note.createdAt).toLocaleDateString()}
                        </StyledText>
                    </View>
                    <TouchableOpacity
                        ref={iconRef}
                        onPress={handleShowMenu}>
                        <Entypo
                            name='dots-three-vertical'
                            size={16}
                            color={theme.text}
                            style={styles.noteActionsButton}
                        />
                    </TouchableOpacity>
                </View>
                <StyledText style={styles.noteContent}>{truncatedContent}</StyledText>
            </View>

            <NoteOptionsMenu
                visible={menuVisible}
                onClose={() => setMenuVisible(false)}
                onDelete={handleDelete}
                onEdit={handleEdit}
                onArchive={handleArchiveToggle}
                menuPosition={menuPosition}
                isArchived={note.isArchived}
            />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    noteItem: {
        marginBottom: 16,
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.25,
        shadowRadius: 2,
        elevation: 2,
        height: 230,
    },
    noteHeader: {
        paddingStart: 16,
        paddingEnd: 0,
        paddingVertical: 10,
        marginBottom: 2,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    noteTitle: {
        fontSize: 15,
    },
    noteDate: {
        fontSize: 8,
    },
    noteContent: {
        fontSize: 14,
        paddingHorizontal: 16,
    },
    noteActionsButton: {
        padding: 10,
        paddingStart: 20,
        paddingEnd: 8,
    },
});

export default NoteEntry;
