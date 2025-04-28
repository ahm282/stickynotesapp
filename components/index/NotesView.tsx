import React from "react";
import { View, StyleSheet } from "react-native";
import { useTheme } from "@/theme/themeProvider";
import { useNotes } from "@/context/NotesContext";
import StyledText from "@/components/ui/StyledText";
import NoteEntry from "../ui/NoteEntry";
import { FlashList } from "@shopify/flash-list";

export const NotesView = () => {
    const theme = useTheme();
    const { notes } = useNotes();

    const unarchivedNotes = notes.filter((note) => note.isArchived === false);

    if (unarchivedNotes.length < 1) {
        return (
            <View style={styles.emptyContainer}>
                <StyledText
                    bold
                    style={{
                        fontSize: 18,
                        color: theme.text,
                        textAlign: "center",
                    }}>
                    No notes yet. Create your first note!
                </StyledText>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlashList
                data={unarchivedNotes}
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
