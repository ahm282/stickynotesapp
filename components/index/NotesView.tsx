import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { useTheme } from "@/theme/themeProvider";
import { useNotes } from "@/context/NotesContext";
import StyledText from "@/components/ui/StyledText";
import NoteEntry from "../ui/NoteEntry";

export const NotesView = () => {
    const theme = useTheme();
    const { notes } = useNotes();

    const unarchivedNotes = notes.filter((note) => note.isArchived === false);

    return unarchivedNotes.length < 1 ? (
        <>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.emptyContainer}>
                <StyledText
                    style={{
                        fontSize: 18,
                        color: theme.text,
                        textAlign: "center",
                    }}>
                    No notes yet. Create your first note!
                </StyledText>
            </ScrollView>
        </>
    ) : (
        <>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.container}>
                <View style={styles.gridContainer}>
                    {notes.map(
                        (note) =>
                            note.isArchived === false && (
                                <NoteEntry
                                    key={note.id}
                                    note={note}
                                />
                            )
                    )}
                </View>
            </ScrollView>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    gridContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        paddingVertical: 8,
        paddingHorizontal: 8,
    },
});

export default NotesView;
