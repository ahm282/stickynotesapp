import * as SplashScreen from "expo-splash-screen";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useFonts, Poppins_400Regular, Poppins_700Bold } from "@expo-google-fonts/poppins";
import { ThemeProvider } from "@/theme/themeProvider";
import { Stack } from "expo-router";
import { Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { NotesProvider } from "@/context/NotesContext";
import { TagsProvider } from "@/context/TagsContext";
import * as SystemUI from "expo-system-ui";
import "react-native-reanimated";
import "@/global.css";

SystemUI.setBackgroundColorAsync("transparent");

(Text as any).defaultProps = {
    // Preserve existing defaultProps if any
    ...((Text as any).defaultProps || {}),
    style: {
        fontFamily: "Poppins_400Regular",
    },
};
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const colorScheme = useColorScheme();
    const [loaded] = useFonts({
        Poppins_400Regular,
        Poppins_700Bold,
    });

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    return (
        <ThemeProvider>
            <NotesProvider>
                <TagsProvider>
                    <Stack
                        screenOptions={{
                            headerShown: false,
                            animation: "flip",
                            animationMatchesGesture: true,
                            animationTypeForReplace: "push",
                            statusBarAnimation: "fade",
                        }}>
                        <Stack.Screen name='(tabs)' />
                        <Stack.Screen name='create-note' />
                        <Stack.Screen name='+not-found' />
                    </Stack>
                    <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
                </TagsProvider>
            </NotesProvider>
        </ThemeProvider>
    );
}
