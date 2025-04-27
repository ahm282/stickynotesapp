import React from "react";
import { View, StyleSheet } from "react-native";
import { ToastConfigParams } from "react-native-toast-message";
import StyledText from "@/components/ui/StyledText";
import { CircleCheck, XCircle, Archive, Trash2, Info } from "lucide-react-native";

export const toastConfig = {
    // Custom success toast
    success: ({ text1, text2, ...props }: ToastConfigParams<any>) => (
        <View style={[styles.toastContainer, styles.successContainer]}>
            <CircleCheck
                size={24}
                color='#4CAF50'
            />
            <View style={styles.contentContainer}>
                {text1 && (
                    <StyledText
                        bold
                        style={styles.title}>
                        {text1}
                    </StyledText>
                )}
                {text2 && <StyledText style={styles.message}>{text2}</StyledText>}
            </View>
        </View>
    ),

    // Custom error toast
    error: ({ text1, text2, ...props }: ToastConfigParams<any>) => (
        <View style={[styles.toastContainer, styles.errorContainer]}>
            <XCircle
                size={24}
                color='#FF3232'
            />
            <View style={styles.contentContainer}>
                {text1 && (
                    <StyledText
                        bold
                        style={styles.title}>
                        {text1}
                    </StyledText>
                )}
                {text2 && <StyledText style={styles.message}>{text2}</StyledText>}
            </View>
        </View>
    ),

    // Custom info toast
    info: ({ text1, text2, ...props }: ToastConfigParams<any>) => (
        <View style={[styles.toastContainer, styles.infoContainer]}>
            <Info
                size={24}
                color='#2196F3'
            />
            <View style={styles.contentContainer}>
                {text1 && (
                    <StyledText
                        bold
                        style={styles.title}>
                        {text1}
                    </StyledText>
                )}
                {text2 && <StyledText style={styles.message}>{text2}</StyledText>}
            </View>
        </View>
    ),

    // Custom archive toast
    archive: ({ text1, text2, ...props }: ToastConfigParams<any>) => (
        <View style={[styles.toastContainer, styles.archiveContainer]}>
            <Archive
                size={24}
                color='#D59405'
            />
            <View style={styles.contentContainer}>
                {text1 && (
                    <StyledText
                        bold
                        style={styles.title}>
                        {text1}
                    </StyledText>
                )}
                {text2 && <StyledText style={styles.message}>{text2}</StyledText>}
            </View>
        </View>
    ),

    // Custom delete toast
    delete: ({ text1, text2, ...props }: ToastConfigParams<any>) => (
        <View style={[styles.toastContainer, styles.deleteContainer]}>
            <Trash2
                size={24}
                color='#FF3232'
            />
            <View style={styles.contentContainer}>
                {text1 && (
                    <StyledText
                        bold
                        style={styles.title}>
                        {text1}
                    </StyledText>
                )}
                {text2 && <StyledText style={styles.message}>{text2}</StyledText>}
            </View>
        </View>
    ),
};

const styles = StyleSheet.create({
    toastContainer: {
        height: "auto",
        width: "90%",
        borderRadius: 6,
        paddingVertical: 12,
        paddingStart: 8,
        paddingEnd: 10,
        marginVertical: 4,
        shadowColor: "#000",
        shadowOpacity: 0.15,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 2,
        minHeight: 50,
        flexDirection: "row",
        alignItems: "center",
        columnGap: 8,
    },
    successContainer: {
        backgroundColor: "#fff",
        borderLeftWidth: 8,
        borderLeftColor: "#4CAF50",
    },
    errorContainer: {
        backgroundColor: "#fff",
        borderLeftWidth: 8,
        borderLeftColor: "#FF3232",
    },
    infoContainer: {
        backgroundColor: "#fff",
        borderLeftWidth: 8,
        borderLeftColor: "#2196F3",
    },
    archiveContainer: {
        backgroundColor: "#fff",
        borderLeftWidth: 8,
        borderLeftColor: "#D59405",
    },
    deleteContainer: {
        backgroundColor: "#fff",
        borderLeftWidth: 8,
        borderLeftColor: "#FF3232",
    },
    contentContainer: {
        flex: 1,
        paddingHorizontal: 4,
        justifyContent: "center",
    },
    title: {
        fontSize: 15,
        color: "#212121",
    },
    message: {
        fontSize: 14,
        color: "#757575",
    },
});
