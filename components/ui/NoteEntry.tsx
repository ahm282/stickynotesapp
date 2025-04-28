import React, { useMemo, useState, useRef } from "react";
import { View, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { useTheme } from "@/theme/themeProvider";
import { Note, useNotes } from "@/context/NotesContext";
import { useTags } from "@/context/TagsContext";
import Entypo from "@expo/vector-icons/Entypo";
import StyledText from "@/components/ui/StyledText";
import MiniTag from "@/components/ui/MiniTag";
import truncateText from "@/util/TruncateNote";
import NoteOptionsMenu from "@/components/ui/NoteOptionsMenu";
import { router } from "expo-router";

interface NoteProps {
    note: Note;
}

export const NoteEntry = ({ note }: NoteProps) => {
    const theme = useTheme();
    const { tags } = useTags();
    const { deleteNote, archiveNote, unarchiveNote } = useNotes();
    const screenWidth = Dimensions.get("window").width;
    const noteWidth = (screenWidth - 60) / 2;
    const noteHeight = 230;
    const [menuVisible, setMenuVisible] = useState(false);
    const [menuPosition, setMenuPosition] = useState<{ x: number; y: number } | undefined>(undefined);
    const iconRef = useRef<View>(null);

    // Get tags for this note - limit to 3 for mini tags
    const noteTags = useMemo(() => {
        if (!note.tagIds || note.tagIds.length === 0) return [];
        return tags.filter((tag) => note.tagIds.includes(tag.id)).slice(0, 3);
    }, [note.tagIds, tags]);

    // Calculate if we need to show a "+n more" badge
    const extraTagsCount = (note.tagIds?.length || 0) - noteTags.length;

    const truncatedContent = useMemo(() => {
        // Only reduce height slightly for tags since they're now much smaller
        const contentHeight = noteTags.length > 0 ? noteHeight - 15 : noteHeight;
        return truncateText(note.content, noteWidth, contentHeight);
    }, [note.content, noteWidth, noteHeight, noteTags.length]);

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
                ...styles.noteCard,
                backgroundColor: getNoteColor(),
                width: noteWidth,
            }}>
            <View style={styles.noteCardContent}>
                <View style={styles.noteCardHeader}>
                    <View>
                        <StyledText
                            style={{
                                ...styles.noteCardTitle,
                                color: theme.text,
                            }}
                            bold>
                            {note.title}
                        </StyledText>
                        <StyledText
                            style={{
                                ...styles.noteCardDate,
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
                            style={styles.optionsIcon}
                        />
                    </TouchableOpacity>
                </View>
                <StyledText style={styles.noteCardText}>{truncatedContent}</StyledText>

                {/* Tags display */}
                {noteTags.length > 0 && (
                    <View style={styles.tagsContainer}>
                        {noteTags.map((tag) => (
                            <MiniTag
                                key={tag.id}
                                text={tag.name}
                            />
                        ))}
                        {extraTagsCount > 0 && (
                            <View style={[styles.moreTagsBadge, { backgroundColor: theme.tagBackground }]}>
                                <StyledText style={[styles.moreTagsText, { color: theme.text }]}>
                                    +{extraTagsCount}
                                </StyledText>
                            </View>
                        )}
                    </View>
                )}
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
    noteCard: {
        marginBottom: 16,
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.25,
        shadowRadius: 2,
        elevation: 2,
        height: 230,
        display: "flex",
        flexDirection: "column",
    },
    noteCardContent: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
    },
    noteCardHeader: {
        paddingStart: 16,
        paddingEnd: 0,
        paddingVertical: 10,
        marginBottom: 2,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    noteCardTitle: {
        fontSize: 15,
    },
    noteCardDate: {
        fontSize: 8,
    },
    noteCardText: {
        fontSize: 14,
        paddingHorizontal: 16,
        flex: 1,
    },
    tagsContainer: {
        flexDirection: "row",
        justifyContent: "flex-end",
        marginEnd: 10,
        paddingBottom: 10,
        paddingTop: 2,
        flexWrap: "nowrap",
        alignItems: "center",
    },
    moreTagsBadge: {
        borderRadius: 4,
        paddingVertical: 1,
        paddingHorizontal: 3,
    },
    moreTagsText: {
        fontSize: 7,
        fontFamily: "Poppins_400Regular",
    },
    optionsIcon: {
        padding: 10,
        paddingStart: 20,
        paddingEnd: 8,
    },
});

export default NoteEntry;
