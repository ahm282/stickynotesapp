import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Tag } from "@/components/ui/Tag";

export const TagsFilter = () => {
    const tags = [
        { id: "2", text: "Work", color: "#a80450" },
        { id: "3", text: "Personal", color: "#04a850" },
        { id: "4", text: "Ideas", color: "#a85004" },
        { id: "5", text: "Shopping", color: "#50a804" },
        { id: "6", text: "Health", color: "#0045a8" },
        { id: "7", text: "Meetings", color: "#a804a8" },
        { id: "8", text: "Reading", color: "#a8a804" },
    ];

    const [selectedTag, setSelectedTag] = useState<string>("all");
    const [filteredTags, setFilteredTags] = useState(tags);

    useEffect(() => {
        if (selectedTag && selectedTag !== "all") {
            const filtered = tags.filter((tag) => tag.id === selectedTag);
            setFilteredTags(filtered);
        } else {
            setFilteredTags(tags);
        }
    }, [selectedTag]);

    const handleTagPress = (id: string) => {
        setSelectedTag((prevSelected) => (prevSelected === id ? "all" : id));
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
                    text={tag.text}
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
