import React from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header } from "@/components/index/Header";
import { useTags } from "@/context/TagsContext";
import { useTheme } from "@/theme/themeProvider";
import TagInput from "@/components/tags/TagInput";
import TagsList from "@/components/tags/TagsList";

export default function Tags() {
    const theme = useTheme();
    const { tags, addTag, updateTag, deleteTag, isLoading } = useTags();

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
            <Header
                title='Tags'
                subtitle='Organize your notes with tags.'
            />

            {/* Add new tag section */}
            <TagInput onAddTag={addTag} />

            {/* Tags list */}
            <View style={styles.listContainer}>
                <TagsList
                    tags={tags}
                    onUpdateTag={updateTag}
                    onDeleteTag={deleteTag}
                    isLoading={isLoading}
                />
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
    listContainer: {
        flex: 1,
    },
});
