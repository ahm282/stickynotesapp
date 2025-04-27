import React from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@/theme/themeProvider";
import { useNotes } from "@/context/NotesContext";
import StyledText from "@/components/ui/StyledText";
import NoteEntry from "@/components/ui/NoteEntry";
import TagsFilter from "@/components/index/TagsFilter";
import { Header } from "@/components/index/Header";
import NewNoteButton from "@/components/ui/NewNoteButton";

export default function Archive() {
    const theme = useTheme();
    const { notes } = useNotes();

    // Filter for archived notes only
    const archivedNotes = notes.filter((note) => note.isArchived === true);

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
            <Header
                title='Archive'
                subtitle='Your archived notes'
            />
    
            <TagsFilter />
            {archivedNotes.length < 1 ? (
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.emptyContainer}>
                    <StyledText
                        style={{
                            fontSize: 18,
                            color: theme.text,
                            textAlign: "center",
                        }}>
                        No archived notes yet.
                    </StyledText>
                </ScrollView>
            ) : (
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContainer}>
                    <View style={styles.gridContainer}>
                        {archivedNotes.map(
                            (note) =>
                                note.isArchived && (
                                    <NoteEntry
                                        key={note.id}
                                        note={note}
                                    />
                                )
                        )}
                    </View>
                </ScrollView>
            )}
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
    scrollContainer: {
        flexGrow: 1,
    },
    gridContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        paddingHorizontal: 8,
    },
});
