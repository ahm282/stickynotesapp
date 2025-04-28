import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TagsFilter } from "@/components/index/TagsFilter";
import { useTheme } from "@/theme/themeProvider";
import { NotesView } from "@/components/index/NotesView";
import { Header } from "@/components/index/Header";
import NewNoteButton from "@/components/ui/NewNoteButton";

export default function Index() {
    const theme = useTheme();
    const [selectedTagId, setSelectedTagId] = useState<string>("all");

    const handleTagFilter = (tagId: string) => {
        setSelectedTagId(tagId);
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
            <Header
                title='Sticky Notes'
                subtitle='Capture your thoughts and ideas with ease.'
            />
            <TagsFilter onFilterChange={handleTagFilter} />
            <NotesView selectedTagId={selectedTagId} />
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
});
