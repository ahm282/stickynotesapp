import * as SplashScreen from "expo-splash-screen";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useFonts, Poppins_400Regular, Poppins_700Bold } from "@expo-google-fonts/poppins";
import { ThemeProvider } from "@/theme/themeProvider";
import { Stack } from "expo-router";
import { Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import "@/global.css";

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
            <Stack
                screenOptions={{
                    headerShown: false,
                    statusBarStyle: colorScheme === "dark" ? "light" : "dark",
                }}>
                <Stack.Screen name='(tabs)' />
                <Stack.Screen name='+not-found' />
            </Stack>
            <StatusBar style='auto' />
        </ThemeProvider>
    );
}
