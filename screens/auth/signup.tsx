import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

export default function SignUpScreen({ navigation }) {
    return (
        <View style={styles.container}>

            <Text style={styles.title}>Terhal</Text>

            <TextInput
                placeholder="Email"
                style={styles.input}
            />

            <TextInput
                placeholder="Password"
                secureTextEntry
                style={styles.input}
            />

            <Pressable
                style={styles.button}
                onPress={() => navigation.navigate("Main")}
            >
                <Text style={styles.buttonText}>Login</Text>
            </Pressable>

            <Pressable onPress={() => navigation.navigate("Signup")}>
                <Text style={styles.link}>
                    Don’t have an account? Sign up
                </Text>
            </Pressable>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 20,
    },

    title: {
        fontSize: 32,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 40,
    },

    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 12,
        padding: 15,
        marginBottom: 15,
    },

    button: {
        backgroundColor: "#419b55",
        padding: 15,
        borderRadius: 12,
        alignItems: "center",
    },

    buttonText: {
        color: "#fff",
        fontWeight: "bold",
    },

    link: {
        textAlign: "center",
        marginTop: 15,
        color: "#419b55",
    },
});