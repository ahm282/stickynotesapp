import React, { createContext, useContext } from "react";
import { useColorScheme } from "react-native";
import { lightTheme, darkTheme, ThemeType } from "./themes";

const ThemeContext = createContext<ThemeType>(lightTheme);

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const scheme = useColorScheme();
    const theme = scheme === "dark" ? darkTheme : lightTheme;

    return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
};
