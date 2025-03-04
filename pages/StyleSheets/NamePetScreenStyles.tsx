import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        position: "absolute",
        fontSize: 28,
        fontWeight: "bold",
        color: "#333",
        textAlign: "center",
    },
    petBox: {
        width: 200,
        height: 200,
        borderRadius: 20,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
        elevation: 5,
        marginBottom: 20,
    },
    petImage: {
        width: "100%",
        height: "100%",
        resizeMode: "contain",
    },
    input: {
        width: "80%",
        padding: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#ccc",
        fontSize: 18,
        color: "#333",
        backgroundColor: "#eee",
        textAlign: "center",
        marginBottom: 20,
    },
    button: {
        backgroundColor: "#ff6b6b",
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 10,
    },
    buttonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
});