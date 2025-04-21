import { Text, View, StyleSheet } from "react-native";

export default function Tags() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Tags</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
    },
});
