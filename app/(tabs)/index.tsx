import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TagsFilter } from "@/components/index/TagsFilter";
import { useTheme } from "@/theme/themeProvider";
import { NotesView } from "@/components/index/NotesView";
import { IndexHeader } from "@/components/index/IndexHeader";
import NewNoteButton from "@/components/ui/NewNoteButton";

export default function Index() {
    const theme = useTheme();

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
            <IndexHeader />
            <TagsFilter />
            <NotesView />
            <NewNoteButton />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: "10%",
        paddingHorizontal: 5,
    },
});
