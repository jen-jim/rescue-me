import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000",
    },
    video: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: width,
        height: height * 0.8,
    },
    errorText: {
        color: "red",
        fontSize: 16,
        padding: 10,
        backgroundColor: "rgba(0,0,0,0.7)",
        zIndex: 10,
        position: "absolute",
        top: 20,
    },
    overlay: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: "flex-end",
        alignItems: "center",
    },
    bottomContainer: {
        width: "100%",
        alignItems: "center",
        marginBottom: height * 0.1,
    },
    title: {
        fontSize: 32,
        fontWeight: "bold",
        color: "#ffffff",
        textShadowColor: "rgba(0, 0, 0, 0.7)",
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 5,
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