import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { useTheme } from "@/theme/themeProvider";
import { useNotes } from "@/context/NotesContext";
import StyledText from "@/components/ui/StyledText";
import NoteEntry from "../ui/NoteEntry";

export const NotesView = () => {
    const theme = useTheme();
    const { notes } = useNotes();

    console.log("NotesView rendered with notes:", notes);
    return notes.length < 1 ? (
        <>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.emptyContainer}>
                <StyledText
                    style={{
                        fontSize: 14,
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
                    {notes.map((note) => (
                        <NoteEntry
                            key={note.id}
                            note={note}
                        />
                    ))}
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
        padding: 16,
    },
    gridContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
});

export default NotesView;
