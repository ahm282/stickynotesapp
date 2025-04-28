import React from "react";
import { ActivityIndicator, View, StyleSheet } from "react-native";
import { FlashList } from "@shopify/flash-list";
import EmptyTagsState from "./EmptyTagsState";
import TagItem from "./TagItem";
import { useTheme } from "@/theme/themeProvider";

interface Tag {
    id: string;
    name: string;
}

interface TagsListProps {
    tags: Tag[];
    onUpdateTag: (id: string, name: string) => Promise<void>;
    onDeleteTag: (id: string) => Promise<void>;
    isLoading?: boolean;
}

export const TagsList = ({ tags, onUpdateTag, onDeleteTag, isLoading = false }: TagsListProps) => {
    const theme = useTheme();

    const renderItem = ({ item }: { item: Tag }) => (
        <TagItem
            id={item.id}
            name={item.name}
            onUpdateTag={onUpdateTag}
            onDeleteTag={onDeleteTag}
        />
    );

    if (isLoading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color={theme.tint} />
            </View>
        );
    }

    return tags.length === 0 ? (
        <EmptyTagsState />
    ) : (
        <FlashList
            data={tags}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            estimatedItemSize={50}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.tagsListContainer}
        />
    );
};

const styles = StyleSheet.create({
    tagsListContainer: {
        paddingBottom: 20,
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20,
    },
});

export default TagsList;
