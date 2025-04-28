import React, { useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@/theme/themeProvider";
import { useNotes } from "@/context/NotesContext";
import StyledText from "@/components/ui/StyledText";
import NoteEntry from "@/components/ui/NoteEntry";
import TagsFilter from "@/components/index/TagsFilter";
import { Header } from "@/components/index/Header";
import NewNoteButton from "@/components/ui/NewNoteButton";
import { FlashList } from "@shopify/flash-list";

export default function Archive() {
    const theme = useTheme();
    const { notes } = useNotes();
    const [selectedTagId, setSelectedTagId] = useState<string>("all");

    // Handle tag filter change
    const handleTagFilter = (tagId: string) => {
        setSelectedTagId(tagId);
    };

    // Memoize filtered notes based on archive status and selected tag
    const filteredNotes = useMemo(() => {
        // First filter to get archived notes
        const archivedNotes = notes.filter((note) => note.isArchived === true);

        // If "all" is selected, return all archived notes
        if (selectedTagId === "all") {
            return archivedNotes;
        }

        // Otherwise, filter by the selected tag
        return archivedNotes.filter((note) => note.tagIds && note.tagIds.includes(selectedTagId));
    }, [notes, selectedTagId]);

    // Render the empty state or notes list using FlashList
    const renderContent = () => {
        if (filteredNotes.length === 0) {
            return (
                <View style={styles.emptyContainer}>
                    <StyledText
                        bold
                        style={{
                            fontSize: 18,
                            color: theme.text,
                            textAlign: "center",
                        }}>
                        {selectedTagId === "all" ? "No archived notes yet." : "No archived notes with this tag."}
                    </StyledText>
                </View>
            );
        }

        return (
            <FlashList
                data={filteredNotes}
                renderItem={({ item }) => <NoteEntry note={item} />}
                estimatedItemSize={100}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.gridContainer}
                numColumns={2}
            />
        );
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
            <Header
                title='Archive'
                subtitle='Your archived notes.'
            />
            <TagsFilter onFilterChange={handleTagFilter} />
            {renderContent()}
            <NewNoteButton />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: "10%",
        paddingHorizontal: 16,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    gridContainer: {
        padding: 8,
    },
});
