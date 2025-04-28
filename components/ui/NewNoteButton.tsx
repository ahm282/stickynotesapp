import { useTheme } from "@/theme/themeProvider";
import { useRouter } from "expo-router";
import { TouchableOpacity, StyleSheet } from "react-native";
import StyledText from "@/components/ui/StyledText";
import { Plus } from "lucide-react-native";

export const NewNoteButton = () => {
    const theme = useTheme();
    const router = useRouter();

    return (
        <TouchableOpacity
            onPress={() => router.push("/create-note")}
            style={[styles.createNoteButton, { backgroundColor: theme.tint }]}>
            <Plus
                size={20}
                color={theme.background}
                style={{ marginBottom: 3, marginEnd: 2 }}
            />
            <StyledText style={[styles.buttonLabel, { color: theme.background }]}>New Note</StyledText>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    createNoteButton: {
        position: "absolute",
        bottom: 20,
        right: 10,
        flexDirection: "row",
        alignItems: "center",
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
    buttonLabel: {
        marginStart: 4,
        fontSize: 16,
    },
});

export default NewNoteButton;
