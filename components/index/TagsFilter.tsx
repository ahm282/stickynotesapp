import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Tag } from "@/components/ui/Tag";
import { useTags } from "@/context/TagsContext";

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

    return (
        <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.container}
            style={styles.filterContainer}>
            <Tag
                key='all'
                id='all'
                text='All notes'
                size='md'
                onPress={() => handleTagPress("all")}
                selected={selectedTag === "all"}
            />
            {tags.map((tag) => (
                <Tag
                    key={tag.id}
                    id={tag.id}
                    text={tag.name}
                    size='md'
                    onPress={() => handleTagPress(tag.id)}
                    selected={selectedTag === tag.id}
                />
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        gap: 6,
        flexDirection: "row",
        alignItems: "flex-start",
        minHeight: 50,
    },
    filterContainer: {
        maxHeight: 70,
        paddingVertical: 10,
    },
});

export default TagsFilter;
