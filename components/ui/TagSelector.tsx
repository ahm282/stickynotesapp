import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Modal, FlatList } from "react-native";
import { useTags } from "@/context/TagsContext";
import { useTheme } from "@/theme/themeProvider";
import StyledText from "./StyledText";
import { Tag, Edit } from "lucide-react-native";
import StaticTag from "./StaticTag";

interface TagSelectorProps {
    selectedTagIds: string[];
    onTagsChange: (tagIds: string[]) => void;
}

const TagSelector: React.FC<TagSelectorProps> = ({ selectedTagIds, onTagsChange }) => {
    const theme = useTheme();
    const { tags } = useTags();
    const [modalVisible, setModalVisible] = useState(false);

    // Count of selected tags to display on button
    const selectedTagsCount = selectedTagIds.length;

    // Find tag names for selected tag IDs
    const selectedTagNames = tags.filter((tag) => selectedTagIds.includes(tag.id)).map((tag) => tag.name);

    const handleTagToggle = (tagId: string) => {
        const updatedTags = selectedTagIds.includes(tagId)
            ? selectedTagIds.filter((id) => id !== tagId)
            : [...selectedTagIds, tagId];

        onTagsChange(updatedTags);
    };

    const tagLabel =
        selectedTagsCount === 0 ? "Add tags" : `${selectedTagsCount} tag${selectedTagsCount > 1 ? "s" : ""} selected`;

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={[styles.tagsButton, { backgroundColor: theme.card }]}
                onPress={() => setModalVisible(true)}>
                <Tag
                    size={18}
                    color={theme.icon}
                />
                <StyledText style={[styles.tagsButtonText, { color: theme.text }]}>{tagLabel}</StyledText>
                <Edit
                    size={16}
                    color={theme.icon}
                />
            </TouchableOpacity>

            {selectedTagsCount > 0 && (
                <View style={styles.selectedTagsContainer}>
                    <FlatList
                        horizontal
                        data={selectedTagNames}
                        keyExtractor={(item, index) => `selected-tag-${index}`}
                        renderItem={({ item }) => (
                            <View style={[styles.selectedTagBadge, { backgroundColor: theme.tint }]}>
                                <StyledText style={[styles.selectedTagText, { color: theme.background }]}>
                                    {item}
                                </StyledText>
                            </View>
                        )}
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
            )}

            <Modal
                animationType='slide'
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}>
                <View style={styles.centeredView}>
                    <View style={[styles.modalView, { backgroundColor: theme.card }]}>
                        <View style={styles.modalHeader}>
                            <StyledText
                                bold
                                style={[styles.modalTitle, { color: theme.text }]}>
                                Select Tags
                            </StyledText>
                            <TouchableOpacity onPress={() => setModalVisible(false)}>
                                <StyledText style={{ color: theme.tint }}>Done</StyledText>
                            </TouchableOpacity>
                        </View>

                        <FlatList
                            data={tags}
                            keyExtractor={(item) => `tag-${item.id}`}
                            renderItem={({ item, index }) => (
                                <TouchableOpacity
                                    style={[
                                        styles.tagItem,
                                        // Only add bottom border if not the last item
                                        index < tags.length - 1
                                            ? { borderBottomWidth: 1, borderBottomColor: theme.borderColor }
                                            : {},
                                    ]}
                                    onPress={() => handleTagToggle(item.id)}>
                                    <View style={styles.tagContent}>
                                        {/* Use StaticTag instead of TagComponent */}
                                        <StaticTag
                                            id={item.id}
                                            text={item.name}
                                            size='sm'
                                            selected={selectedTagIds.includes(item.id)}
                                        />
                                    </View>
                                </TouchableOpacity>
                            )}
                            style={styles.tagsList}
                            contentContainerStyle={styles.tagsListContent}
                        />

                        {tags.length === 0 && (
                            <View style={styles.emptyState}>
                                <StyledText style={{ color: theme.icon, textAlign: "center" }}>
                                    No tags available. Create tags from the Tags tab.
                                </StyledText>
                            </View>
                        )}
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 8,
    },
    tagsButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 12,
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1,
    },
    tagsButtonText: {
        flex: 1,
        marginLeft: 10,
    },
    selectedTagsContainer: {
        marginTop: 8,
    },
    selectedTagBadge: {
        borderRadius: 16,
        paddingVertical: 4,
        paddingHorizontal: 12,
        marginRight: 8,
        marginBottom: 4,
    },
    selectedTagText: {
        fontSize: 12,
    },
    centeredView: {
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalView: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 16,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: -2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        maxHeight: "80%",
    },
    modalHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 16,
    },
    modalTitle: {
        fontSize: 18,
    },
    tagsList: {
        maxHeight: 300,
    },
    tagsListContent: {
        paddingBottom: 20,
    },
    tagItem: {
        paddingVertical: 12,
    },
    tagContent: {
        flexDirection: "row",
        alignItems: "center",
    },
    emptyState: {
        padding: 20,
        alignItems: "center",
    },
});

export default TagSelector;
