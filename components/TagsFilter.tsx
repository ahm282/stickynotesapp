import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Tag } from "@/components/ui/Tag";
import { useTheme } from "@/theme/themeProvider";

export const TagsFilter = () => {
    const theme = useTheme();
    const tags = [
        { id: "2", text: "Work", color: "#a80450" },
        { id: "3", text: "Personal", color: "#04a850" },
        { id: "4", text: "Ideas", color: "#a85004" },
        { id: "5", text: "Shopping", color: "#50a804" },
        { id: "6", text: "Health", color: "#0045a8" },
        { id: "7", text: "Meetings", color: "#a804a8" },
        { id: "8", text: "Reading", color: "#a8a804" },
    ];

    const [selectedTag, setSelectedTag] = useState<string | null>(null);
    const [filteredTags, setFilteredTags] = useState(tags);

    useEffect(() => {
        setSelectedTag("all");
    }, []);

    useEffect(() => {
        if (selectedTag && selectedTag !== "all") {
            const filtered = tags.filter((tag) => tag.id === selectedTag);
            setFilteredTags(filtered);
        } else {
            setFilteredTags(tags);
        }
    }, [selectedTag]);

    const handleTagPress = (id: string) => {
        setSelectedTag((prev) => (prev === id ? "all" : id));
    };

    return (
        <ScrollView
            horizontal={true}
            contentContainerStyle={styles.container}>
            <Tag
                key='all'
                id='all'
                text='All notes'
                size='md'
                onPress={() => handleTagPress("all")}
                selected={selectedTag === "all"}
                style={styles.allNotesTag}
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
        gap: 8,
        flexDirection: "row",
        paddingVertical: 4,
        alignItems: "center",
    },
    allNotesTag: {
        marginRight: 4,
    },
});

export default TagsFilter;
