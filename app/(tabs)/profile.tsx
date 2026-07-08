import { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

// receive data from Login/Signup
export default function ProfileScreen({ route }) {
    const [activeTab, setActiveTab] = useState("favorites");

    // it defaults to "Guest"
    const userName = route.params?.userName ?? "Guest";

    return (
        <View style={styles.container}>

           
            <Image
                source={require("../../assets/images/profile.jpg")}
                style={styles.profileImage}
            />

            {/* Dynamic name */}
            <Text style={styles.userName}>{userName}</Text>

            {/* Tabs */}
            <View style={styles.tabs}>
                <Pressable onPress={() => setActiveTab("favorites")}>
                    <Text style={[
                        styles.tabText,
                        activeTab === "favorites" && styles.activeTab
                    ]}>
                        Favorites
                    </Text>
                </Pressable>

                <Pressable onPress={() => setActiveTab("comments")}>
                    <Text style={[
                        styles.tabText,
                        activeTab === "comments" && styles.activeTab
                    ]}>
                        Comments
                    </Text>
                </Pressable>
            </View>

        
            <View style={styles.line} />


            <View style={[
                styles.content,
                activeTab === "favorites" ? styles.favoritesBg : styles.commentBg
            ]}>
                {activeTab === "favorites" ? (
                    <Text style={styles.contentText}>No favorite places yet.</Text>
                ) : (
                    <Text style={styles.contentText}>No comments yet.</Text>
                )}
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        paddingTop: 50,
        backgroundColor: "#fff",
    },
    favoritesBg: {
        backgroundColor: "#f2f8f4",
    },
    commentBg: {
        backgroundColor: "#f8f2f2",
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginBottom: 10,

    },
    userName: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 70,
        color: "#2d5239",
    },
    tabs: {
        flexDirection: "row",
        gap: 75,
    },
    tabText: {
        fontSize: 16,
        color: "#777",
    },
    activeTab: {
        color: "#000",
        fontWeight: "bold",
    },
    line: {
        width: "90%",
        height: 1,
        backgroundColor: "#ccc",
        marginVertical: 10,
    },
    content: {
        marginTop: 10,
        width: "100%",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    contentText: {
        fontSize: 16,
        color: "#555",
        fontStyle: "italic",
    }
});