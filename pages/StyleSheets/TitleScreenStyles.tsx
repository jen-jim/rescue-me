import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000",
    },
    video: {
        position: "absolute",
        width: "100%",
        height: "100%",
    },
    title: {
        position: "absolute",
        alignSelf: "center",
        fontSize: 32,
        fontWeight: "bold",
        color: "#ffffff",
        textAlign: "center",
        textShadowColor: "rgba(0, 0, 0, 0.7)",
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 5,
    },
    subtitle: {
        position: "absolute",
        alignSelf: "center",
        fontSize: 24,
        color: "#ffffff",
        textAlign: "center",
        opacity: 0.9,
    },
    overlay: {
        position: "absolute",
        width: "100%",
        height: "100%",
        justifyContent: "flex-end",
        alignItems: "center",
    },
    bottomContainer: {
        position: "absolute",
        bottom: 50,
        width: "100%",
        alignItems: "center",
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
