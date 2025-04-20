import { Text, View, StyleSheet } from "react-native";
import { useTheme } from "@/theme/themeProvider";

export default function Archive() {
    const theme = useTheme();

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Archive page</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        color: "#3b82f6", // blue-500 equivalent
    },
});
