import { useTheme } from "@/theme/themeProvider";
import { useRouter } from "expo-router";
import { TouchableOpacity, StyleSheet } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import StyledText from "@/components/ui/StyledText";

export const NewNoteButton = () => {
    const theme = useTheme();
    const router = useRouter();

    return (
        <TouchableOpacity
            onPress={() => router.push("/create-note")}
            style={[styles.button, { backgroundColor: theme.tint }]}>
            <MaterialCommunityIcons
                name='plus'
                size={24}
                color={theme.background}
            />
            <StyledText style={[styles.text, { color: theme.background }]}>New Note</StyledText>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        position: "absolute",
        bottom: 20,
        right: 10,
        flexDirection: "row",
        alignItems: "stretch",
        justifyContent: "center",
        paddingHorizontal: 7,
        paddingTop: 8,
        paddingBottom: 5,
        borderRadius: 8,
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.25,
    },
    text: {
        marginStart: 4,
        fontSize: 16,
    },
});

export default NewNoteButton;
