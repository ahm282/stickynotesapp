import React, { useMemo } from "react";
import { View, StyleSheet } from "react-native";
import { useTheme } from "@/theme/themeProvider";
import { useNotes } from "@/context/NotesContext";
import StyledText from "@/components/ui/StyledText";
import NoteEntry from "../ui/NoteEntry";
import { FlashList } from "@shopify/flash-list";

interface NotesViewProps {
    selectedTagId?: string;
}

export const NotesView = ({ selectedTagId = "all" }: NotesViewProps) => {
    const theme = useTheme();
    const { notes } = useNotes();

    // Filter notes based on archive status and selected tag
    const filteredNotes = useMemo(() => {
        const unarchivedNotes = notes.filter((note) => note.isArchived === false);

        // If "all" is selected, return all unarchived notes
        if (selectedTagId === "all") {
            return unarchivedNotes;
        }

        // Otherwise, return notes that contain the selected tag ID
        return unarchivedNotes.filter((note) => note.tagIds && note.tagIds.includes(selectedTagId));
    }, [notes, selectedTagId]);

    if (filteredNotes.length < 1) {
        return (
            <View style={styles.emptyContainer}>
                <StyledText
                    bold
                    style={{
                        fontSize: 18,
                        color: theme.text,
                        textAlign: "center",
                    }}>
                    {selectedTagId === "all" ? "No notes yet. Create your first note!" : "No notes with this tag."}
                </StyledText>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlashList
                data={filteredNotes}
                estimatedItemSize={100}
                renderItem={({ item }) => <NoteEntry note={item} />}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.flashListPadding}
                numColumns={2}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    flashListPadding: {
        padding: 8,
    },
});

export default NotesView;
