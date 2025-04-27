import React from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@/theme/themeProvider";
import { useNotes } from "@/context/NotesContext";
import { FontAwesome6 } from "@expo/vector-icons";
import StyledText from "@/components/ui/StyledText";
import NoteEntry from "@/components/ui/NoteEntry";
import TagsFilter from "@/components/index/TagsFilter";
import { Header } from "@/components/index/Header";

export default function Archive() {
    const theme = useTheme();
    const { notes } = useNotes();

    // Filter for archived notes only
    const archivedNotes = notes.filter((note) => note.isArchived === true);

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
            <View>
                <Header
                    title='Archive'
                    subtitle='Your archived notes'
                />
                <View>
                    <TagsFilter />
                </View>
                {archivedNotes.length < 1 ? (
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.emptyContainer}>
                        <StyledText
                            style={{
                                fontSize: 14,
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
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: "10%",
        paddingHorizontal: 16,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingBottom: 16,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: "bold",
    },
    emptyContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
    },
    scrollContainer: {
        flexGrow: 1,
    },
    gridContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
});
