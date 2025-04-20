"use client";

import type React from "react";
import { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface Note {
    id: string;
    title: string;
    content: string;
    tagIds: string[];
    createdAt: number;
    updatedAt: number;
}

interface NotesContextType {
    notes: Note[];
    addNote: (title: string, content: string, tagIds: string[]) => Promise<void>;
    updateNote: (id: string, title: string, content: string, tagIds: string[]) => Promise<void>;
    deleteNote: (id: string) => Promise<void>;
    getNote: (id: string) => Note | undefined;
    getNotesByTag: (tagId: string) => Note[];
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
                    // Migrate old notes without tagIds if needed
                    const parsedNotes = JSON.parse(storedNotes);
                    const migratedNotes = parsedNotes.map((note: any) => ({
                        ...note,
                        tagIds: note.tagIds || [],
                    }));
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

    const addNote = async (title: string, content: string, tagIds: string[] = []) => {
        const newNote: Note = {
            id: Date.now().toString(),
            title,
            content,
            tagIds,
            createdAt: Date.now(),
            updatedAt: Date.now(),
        };

        const updatedNotes = [...notes, newNote];
        setNotes(updatedNotes);
        await saveNotes(updatedNotes);
    };

    const updateNote = async (id: string, title: string, content: string, tagIds: string[] = []) => {
        const updatedNotes = notes.map((note) =>
            note.id === id ? { ...note, title, content, tagIds, updatedAt: Date.now() } : note
        );

        setNotes(updatedNotes);
        await saveNotes(updatedNotes);
    };

    const deleteNote = async (id: string) => {
        const updatedNotes = notes.filter((note) => note.id !== id);
        setNotes(updatedNotes);
        await saveNotes(updatedNotes);
    };

    const getNote = (id: string) => {
        return notes.find((note) => note.id === id);
    };

    const getNotesByTag = (tagId: string) => {
        return notes.filter((note) => note.tagIds.includes(tagId));
    };

    return (
        <NotesContext.Provider value={{ notes, addNote, updateNote, deleteNote, getNote, getNotesByTag }}>
            {children}
        </NotesContext.Provider>
    );
};
