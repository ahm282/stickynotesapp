import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@/theme/themeProvider";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useNotes } from "@/context/NotesContext";
import { ArrowLeft } from "lucide-react-native";
import StyledText from "@/components/ui/StyledText";

export default function EditNote() {
    const theme = useTheme();
    const router = useRouter();
    const { notes } = useNotes();

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

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => router.back()}
                    style={styles.backButton}>
                    <ArrowLeft
                        size={24}
                        color={theme.text}
                    />
                </TouchableOpacity>
                <StyledText style={[styles.headerTitle, { color: theme.tint }]}>{noteDate}</StyledText>
            </View>

            <View style={styles.content}>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        borderBottomWidth: 1,
                        borderBottomColor: theme.secondary,
                    }}>
                    <StyledText
                        style={[
                            styles.titleInput,
                            { color: theme.text, borderBottomColor: "transparent", width: "90%" },
                        ]}
                        selectable={true}>
                        {noteTitle}
                    </StyledText>
                </View>
                <StyledText
                    selectable={true}
                    style={[styles.contentInput, { color: theme.text }]}>
                    {noteContent}
                </StyledText>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 16,
        paddingVertical: 10,
    },
    backButton: {
        padding: 8,
    },
    headerTitle: {
        fontSize: 18,
        fontFamily: "Poppins_700Bold",
    },
    content: {
        flex: 1,
        padding: 16,
    },
    titleInput: {
        fontSize: 24,
        fontFamily: "Poppins_700Bold",
        paddingVertical: 12,
        borderBottomWidth: 1,
    },
    contentInput: {
        fontSize: 16,
        fontFamily: "Poppins_400Regular",
        flex: 1,
        textAlignVertical: "top",
        paddingVertical: 16,
    },
});
