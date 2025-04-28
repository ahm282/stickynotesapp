import type React from "react";
import { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";

export interface Note {
    id: string;
    title: string;
    content: string;
    tagIds: string[];
    color?: string;
    isArchived?: boolean;
    createdAt: number;
    updatedAt: number;
}

interface NotesContextType {
    notes: Note[];
    addNote: (title: string, content: string, tagIds: string[], color?: string) => Promise<void>;
    updateNote: (id: string, title: string, content: string, tagIds: string[], color: string) => Promise<void>;
    deleteNote: (id: string) => Promise<void>;
    getNote: (id: string) => Note | undefined;
    getNotesByTag: (tagId: string) => Note[];
    archiveNote: (id: string) => Promise<void>;
    unarchiveNote: (id: string) => Promise<void>;
}

const NotesContext = createContext<NotesContextType | undefined>(undefined);

export const useNotes = () => {
    const context = useContext(NotesContext);
    if (!context) {
        throw new Error("useNotes must be used within a NotesProvider");
    }
    return context;
};

export const NotesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [notes, setNotes] = useState<Note[]>([]);

    useEffect(() => {
        const loadNotes = async () => {
            try {
                const storedNotes = await AsyncStorage.getItem("notes");
                if (storedNotes) {
                    // Migrate old notes without tagIds if needed and convert hex colors to color keys if needed
                    const parsedNotes = JSON.parse(storedNotes);
                    const migratedNotes = parsedNotes.map((note: any) => {
                        // Add empty tagIds if missing
                        const updatedNote = {
                            ...note,
                            tagIds: note.tagIds || [],
                        };

                        // Convert hex color to color key if it's a hex color
                        // This is a migration step for older notes that used hex values
                        if (note.color && note.color.startsWith("#")) {
                            // Try to determine which theme color it is closest to
                            // Simple approach: default to "yellow" if we can't determine
                            updatedNote.color = "yellow";
                        }

                        return updatedNote;
                    });
                    setNotes(migratedNotes);
                }
            } catch (error) {
                console.error("Failed to load notes:", error);
            }
        };

        loadNotes();
    }, []);

    const saveNotes = async (updatedNotes: Note[]) => {
        try {
            await AsyncStorage.setItem("notes", JSON.stringify(updatedNotes));
        } catch (error) {
            console.error("Failed to save notes:", error);
        }
    };

    const addNote = async (title: string, content: string, tagIds: string[] = [], color?: string) => {
        const newNote: Note = {
            id: Date.now().toString(),
            title,
            content,
            color: color || "yellow", // Use provided color key or default to "yellow"
            tagIds,
            createdAt: Date.now(),
            updatedAt: Date.now(),
            isArchived: false,
        };

        const updatedNotes = [...notes, newNote];
        setNotes(updatedNotes);
        await saveNotes(updatedNotes);
        Toast.show({
            type: "success",
            text1: "Note Created",
            text2: "Your note has been created successfully.",
        });
    };

    const updateNote = async (
        id: string,
        title: string,
        content: string,
        tagIds: string[] = [],
        color: string = "yellow"
    ) => {
        const updatedNotes = notes.map((note) =>
            note.id === id ? { ...note, title, content, tagIds, color, updatedAt: Date.now() } : note
        );
        setNotes(updatedNotes);
        await saveNotes(updatedNotes);
        Toast.show({
            type: "success",
            text1: "Note Updated",
            text2: "Your changes have been saved.",
        });
    };

    const deleteNote = async (id: string) => {
        const updatedNotes = notes.filter((note) => note.id !== id);
        setNotes(updatedNotes);
        await saveNotes(updatedNotes);
        Toast.show({
            type: "delete",
            text1: "Note Deleted",
            text2: "The note has been removed.",
        });
    };

    const getNote = (id: string) => {
        return notes.find((note) => note.id === id);
    };

    const getNotesByTag = (tagId: string) => {
        return notes.filter((note) => note.tagIds.includes(tagId));
    };

    const archiveNote = async (id: string) => {
        const updatedNotes = notes.map((note) => (note.id === id ? { ...note, isArchived: true } : note));
        setNotes(updatedNotes);
        await saveNotes(updatedNotes);
        Toast.show({
            type: "archive",
            text1: "Note Archived",
            text2: "The note has been moved to archives.",
        });
    };

    const unarchiveNote = async (id: string) => {
        const updatedNotes = notes.map((note) => (note.id === id ? { ...note, isArchived: false } : note));
        setNotes(updatedNotes);
        await saveNotes(updatedNotes);
        Toast.show({
            type: "info",
            text1: "Note Restored",
            text2: "The note has been moved back to your notes.",
        });
    };

    return (
        <NotesContext.Provider
            value={{ notes, addNote, updateNote, deleteNote, getNote, getNotesByTag, archiveNote, unarchiveNote }}>
            {children}
        </NotesContext.Provider>
    );
};
