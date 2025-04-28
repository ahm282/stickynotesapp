import type React from "react";
import { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface Tag {
    id: string;
    name: string;
}

interface TagsContextType {
    tags: Tag[];
    addTag: (name: string) => Promise<void>;
    updateTag: (id: string, name: string) => Promise<void>;
    deleteTag: (id: string) => Promise<void>;
    getTag: (id: string) => Tag | undefined;
    isLoading: boolean;
}

const TagsContext = createContext<TagsContextType | undefined>(undefined);

export const useTags = () => {
    const context = useContext(TagsContext);
    if (!context) {
        throw new Error("useTags must be used within a TagsProvider");
    }
    return context;
};

export const TagsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [tags, setTags] = useState<Tag[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadTags = async () => {
            setIsLoading(true);
            try {
                const storedTags = await AsyncStorage.getItem("tags");
                if (storedTags) {
                    // Filter out any empty tags that might have been saved previously
                    const parsedTags = JSON.parse(storedTags);
                    const validTags = parsedTags.filter((tag: Tag) => tag.name && tag.name.trim() !== "");

                    // If we filtered out tags, save the valid ones back to storage
                    if (validTags.length !== parsedTags.length) {
                        await AsyncStorage.setItem("tags", JSON.stringify(validTags));
                    }

                    setTags(validTags);
                } else {
                    // Initialize with default tags if none exist
                    const defaultTags = [
                        { id: "1", name: "Work" },
                        { id: "2", name: "Personal" },
                        { id: "3", name: "Ideas" },
                        { id: "4", name: "Important" },
                    ];
                    setTags(defaultTags);
                    await AsyncStorage.setItem("tags", JSON.stringify(defaultTags));
                }
            } catch (error) {
                console.error("Failed to load tags:", error);
            } finally {
                setIsLoading(false);
            }
        };

        loadTags();
    }, []);

    const saveTags = async (updatedTags: Tag[]) => {
        try {
            await AsyncStorage.setItem("tags", JSON.stringify(updatedTags));
        } catch (error) {
            console.error("Failed to save tags:", error);
            throw error;
        }
    };

    const addTag = async (name: string): Promise<void> => {
        // Validate tag name
        const trimmedName = name.trim();
        if (!trimmedName) {
            throw new Error("Tag name cannot be empty");
        }

        // Check for duplicates
        const isDuplicate = tags.some((tag) => tag.name.toLowerCase() === trimmedName.toLowerCase());
        if (isDuplicate) {
            throw new Error("A tag with this name already exists");
        }

        try {
            const newTag: Tag = {
                id: Date.now().toString(),
                name: trimmedName,
            };

            const updatedTags = [...tags, newTag];
            setTags(updatedTags);
            await saveTags(updatedTags);
        } catch (error) {
            console.error("Error in addTag:", error);
            throw error;
        }
    };

    const updateTag = async (id: string, name: string): Promise<void> => {
        // Validate tag name
        const trimmedName = name.trim();
        if (!trimmedName) {
            throw new Error("Tag name cannot be empty");
        }

        // Check for duplicates, excluding current tag
        const isDuplicate = tags.some((tag) => tag.id !== id && tag.name.toLowerCase() === trimmedName.toLowerCase());
        if (isDuplicate) {
            throw new Error("A tag with this name already exists");
        }

        try {
            const updatedTags = tags.map((tag) => (tag.id === id ? { ...tag, name: trimmedName } : tag));
            setTags(updatedTags);
            await saveTags(updatedTags);
        } catch (error) {
            console.error("Error in updateTag:", error);
            throw error;
        }
    };

    const deleteTag = async (id: string): Promise<void> => {
        try {
            const updatedTags = tags.filter((tag) => tag.id !== id);
            setTags(updatedTags);
            await saveTags(updatedTags);
        } catch (error) {
            console.error("Error in deleteTag:", error);
            throw error;
        }
    };

    const getTag = (id: string) => {
        return tags.find((tag) => tag.id === id);
    };

    return (
        <TagsContext.Provider
            value={{
                tags,
                addTag,
                updateTag,
                deleteTag,
                getTag,
                isLoading,
            }}>
            {children}
        </TagsContext.Provider>
    );
};
