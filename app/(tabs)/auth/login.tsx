import React, { useState } from "react";
import { Alert, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        if (!email || !password) {
            Alert.alert("Error", "Please fill in all required fields.");
            return;
        }
        // you could fetch it from a real DB
        navigation.navigate("Main", { userName: "User" });
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Terhal</Text>
            <View style={styles.card}>
                <Text style={styles.headerText}>Log in</Text>
                <View style={styles.divider} />

                <Text style={styles.label}>Email/Phone Number <Text style={styles.asterisk}>*</Text></Text>
                <TextInput
                    placeholder="example@example.com"
                    placeholderTextColor="#8e8e8e"
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                />

                <Text style={styles.label}>Password <Text style={styles.asterisk}>*</Text></Text>
                <TextInput
                    placeholder="************"
                    placeholderTextColor="#8e8e8e"
                    secureTextEntry
                    style={styles.input}
                    value={password}
                    onChangeText={setPassword}
                />

                <Pressable onPress={() => {/* Forgot Password Logic here */ }}>
                    <Text style={styles.forgotPassword}>Forgot your password?</Text>
                </Pressable>

                <Pressable style={styles.loginButton} onPress={handleLogin}>
                    <Text style={styles.loginButtonText}>Log in</Text>
                </Pressable>

                <View style={styles.footerRow}>
                    <Text style={styles.footerText}>Don't have an account? </Text>
                    <Pressable onPress={() => navigation.navigate("Signup")}>
                        <Text style={[styles.footerText, styles.signUpLink]}>Sign Up</Text>
                    </Pressable>
                </View>

                <View style={styles.orContainer}>
                    <View style={styles.orLine} />
                    <Text style={styles.orText}>Or</Text>
                    <View style={styles.orLine} />
                </View>

                <Pressable onPress={() => navigation.navigate("Main", { userName: "Guest" })}>
                    <Text style={styles.guestLink}>Join as a Guest</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#3e6b4d",
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontSize: 32,
        color: "#e0e5df",
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 40,
    },
    card: {
        backgroundColor: "#e0e5df",
        width: "90%",
        borderRadius: 30,
        padding: 25,
        paddingTop: 35,
    },
    headerText: {
        fontSize: 28,
        fontWeight: "600",
        color: "#2d5239",
        marginBottom: 10,
    },
    divider: {
        height: 2,
        backgroundColor: "#aeb6ad",
        marginBottom: 25,
    },
    label: {
        fontSize: 16,
        fontWeight: "700",
        color: "#3e6b4d",
        marginBottom: 8,
    },
    asterisk: {
        color: "#c24141",
    },
    input: {
        borderWidth: 1,
        borderColor: "#3e6b4d",
        borderRadius: 25,
        paddingHorizontal: 20,
        paddingVertical: 12,
        fontSize: 16,
        marginBottom: 20,
        backgroundColor: "transparent",
    },
    forgotPassword: {
        color: "#1e5a9c",
        fontSize: 14,
        fontWeight: "600",
        marginBottom: 20,
    },
    loginButton: {
        backgroundColor: "#3e6b4d",
        borderRadius: 30,
        paddingVertical: 15,
        alignItems: "center",
        marginBottom: 20,
        width: "60%",
        alignSelf: "center",
    },
    loginButtonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
    footerRow: {
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: 20,
    },
    footerText: {
        color: "#3e6b4d",
        fontWeight: "600",
    },
    signUpLink: {
        color: "#1e5a9c",
        textDecorationLine: "underline",
    },
    orContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 15,
    },
    orLine: {
        flex: 1,
        height: 1,
        backgroundColor: "#aeb6ad",
    },
    orText: {
        marginHorizontal: 10,
        color: "#3e6b4d",
        fontWeight: "600",
    },
    guestLink: {
        textAlign: "center",
        color: "#3e6b4d",
        fontWeight: "bold",
        fontSize: 16,
        textDecorationLine: "underline",
    },
});