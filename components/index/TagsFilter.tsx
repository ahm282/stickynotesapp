import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Tag } from "@/components/ui/Tag";
import { useTags } from "@/context/TagsContext";
import { FlashList } from "@shopify/flash-list";

export const TagsFilter = ({ onFilterChange }: { onFilterChange?: (tagId: string) => void }) => {
    const { tags } = useTags();
    const [selectedTag, setSelectedTag] = useState<string>("all");

    const handleTagPress = (id: string) => {
        const newSelected = selectedTag === id ? "all" : id;
        setSelectedTag(newSelected);

        // If onFilterChange prop exists, call it with the selected tag id
        if (onFilterChange) {
            onFilterChange(newSelected);
        }
    };

    const tagsData = [{ id: "all", name: "All notes" }, ...tags];

    return (
        <View style={styles.filterContainer}>
            <FlashList
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                data={tagsData}
                estimatedItemSize={30}
                renderItem={({ item }) => (
                    <Tag
                        id={item.id}
                        text={item.name}
                        size='md'
                        onPress={() => handleTagPress(item.id)}
                        selected={selectedTag === item.id}
                    />
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    filterContainer: {
        marginBottom: 10,
    },
});

export default TagsFilter;
