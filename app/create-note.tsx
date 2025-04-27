import React, { useState } from "react";
import { View, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@/theme/themeProvider";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { useNotes } from "@/context/NotesContext";
import StyledText from "@/components/ui/StyledText";
import ColorSelector from "@/components/ui/ColorSelector";
import Toast from "react-native-toast-message";

export default function CreateNote() {
    const theme = useTheme();
    const router = useRouter();
    const { addNote } = useNotes();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [selectedColor, setSelectedColor] = useState("yellow");

    const handleSave = async () => {
        if (title.trim() || content.trim()) {
            await addNote(title.trim() || "Untitled note", content.trim(), [], selectedColor);
            router.back();
        } else {
            Toast.show({
                type: "error",
                text1: "Error",
                text2: "Please enter a title or content for the note.",
            });
        }
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => router.back()}
                    style={styles.backButton}>
                    <MaterialIcons
                        name='arrow-back'
                        size={24}
                        color={theme.text}
                    />
                </TouchableOpacity>
                <StyledText style={[styles.headerTitle, { color: theme.text }]}>New Note</StyledText>
                <TouchableOpacity
                    onPress={handleSave}
                    style={styles.saveButton}>
                    <StyledText style={{ color: theme.tint }}>Save</StyledText>
                </TouchableOpacity>
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
                    <TextInput
                        placeholder='Title'
                        placeholderTextColor={theme.icon}
                        style={[
                            styles.titleInput,
                            { color: theme.text, borderBottomColor: "transparent", width: "90%" },
                        ]}
                        value={title}
                        onChangeText={setTitle}
                    />
                    <ColorSelector
                        selectedColor={selectedColor}
                        onSelectColor={setSelectedColor}
                    />
                </View>
                <TextInput
                    placeholder='Write your note here...'
                    placeholderTextColor={theme.icon}
                    style={[styles.contentInput, { color: theme.text }]}
                    multiline
                    value={content}
                    onChangeText={setContent}
                    autoFocus
                />
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
    saveButton: {
        padding: 8,
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
        marginBottom: 16,
    },
    contentInput: {
        fontSize: 16,
        fontFamily: "Poppins_400Regular",
        flex: 1,
        textAlignVertical: "top",
    },
});
