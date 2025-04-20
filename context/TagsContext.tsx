"use client";

import type React from "react";
import { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface Tag {
    id: string;
    name: string;
    color: string;
}

interface TagsContextType {
    tags: Tag[];
    addTag: (name: string, color: string) => Promise<Tag>;
    updateTag: (id: string, name: string, color: string) => Promise<void>;
    deleteTag: (id: string) => Promise<void>;
    getTag: (id: string) => Tag | undefined;
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

    useEffect(() => {
        const loadTags = async () => {
            try {
                const storedTags = await AsyncStorage.getItem("tags");
                if (storedTags) {
                    setTags(JSON.parse(storedTags));
                } else {
                    // Initialize with default tags if none exist
                    const defaultTags = [
                        { id: "1", name: "Work", color: "#ff7675" },
                        { id: "2", name: "Personal", color: "#74b9ff" },
                        { id: "3", name: "Ideas", color: "#55efc4" },
                        { id: "4", name: "Important", color: "#ffeaa7" },
                    ];
                    setTags(defaultTags);
                    await AsyncStorage.setItem("tags", JSON.stringify(defaultTags));
                }
            } catch (error) {
                console.error("Failed to load tags:", error);
            }
        };

        loadTags();
    }, []);

    const saveTags = async (updatedTags: Tag[]) => {
        try {
            await AsyncStorage.setItem("tags", JSON.stringify(updatedTags));
        } catch (error) {
            console.error("Failed to save tags:", error);
        }
    };

    const addTag = async (name: string, color: string): Promise<Tag> => {
        const newTag: Tag = {
            id: Date.now().toString(),
            name,
            color,
        };

        const updatedTags = [...tags, newTag];
        setTags(updatedTags);
        await saveTags(updatedTags);
        return newTag;
    };

    const updateTag = async (id: string, name: string, color: string) => {
        const updatedTags = tags.map((tag) => (tag.id === id ? { ...tag, name, color } : tag));
        setTags(updatedTags);
        await saveTags(updatedTags);
    };

    const deleteTag = async (id: string) => {
        const updatedTags = tags.filter((tag) => tag.id !== id);
        setTags(updatedTags);
        await saveTags(updatedTags);
    };

    const getTag = (id: string) => {
        return tags.find((tag) => tag.id === id);
    };

    return (
        <TagsContext.Provider value={{ tags, addTag, updateTag, deleteTag, getTag }}>{children}</TagsContext.Provider>
    );
};
