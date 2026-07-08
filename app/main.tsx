import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Platform, StyleSheet, TouchableOpacity, View } from "react-native";

// screens
import Camera from "./(tabs)/camera";
import Home from "./(tabs)/home";
import Map from "./(tabs)/map";
import Planner from "./(tabs)/planner";
import Profile from "./(tabs)/profile";

const Tab = createBottomTabNavigator();

const CustomCameraButton = ({ children, onPress }) => (
    <TouchableOpacity
        style={styles.cameraButtonContainer}
        onPress={onPress}
        activeOpacity={0.9}
    >
        <View style={styles.cameraButtonInner}>
            {children}
        </View>
    </TouchableOpacity>
);

export default function Main() {
    return (

        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: styles.tabBar,
                tabBarActiveTintColor: "#419b55",
                tabBarInactiveTintColor: "#BDBDBD",
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === "Home") iconName = focused ? "home" : "home-outline";
                    else if (route.name === "Map") iconName = focused ? "map" : "map-outline";
                    else if (route.name === "Planner") iconName = focused ? "calendar" : "calendar-outline";
                    else if (route.name === "Profile") iconName = focused ? "person" : "person-outline";

                    // The "focused" icons have different style
                    return (
                        <View style={focused ? styles.activeIconContainer : null}>
                            <Ionicons name={iconName} size={24} color={color} />
                            {focused && <View style={styles.activeDot} />}
                        </View>
                    );
                },
            })}
        >
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Map" component={Map} />

            <Tab.Screen
                name="Camera"
                component={Camera}
                options={{
                    tabBarButton: (props) => (
                        <CustomCameraButton {...props}>
                            <Ionicons name="scan-outline" size={30} color="#fff" />
                        </CustomCameraButton>
                    ),
                }}
            />

            <Tab.Screen name="Planner" component={Planner} />
            <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    tabBar: {
        position: 'absolute',
        bottom: 10,
        left: 20,
        right: 20,
        backgroundColor: "#ffffff",
        borderRadius: 25,
        height: 60,
        // Shadow for iOS
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        // Shadow for Android
        elevation: 5,
        borderTopWidth: 0,
        paddingBottom: Platform.OS === 'ios' ? 20 : 0,
    },
    activeIconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    activeDot: {
        width: 4,
        height: 4,
        borderRadius: 2,
        backgroundColor: '#419b55',
        marginTop: 4,
    },
    cameraButtonContainer: {
        top: -15,
        justifyContent: "center",
        alignItems: "center",
    },
    cameraButtonInner: {
        width: 65,
        height: 65,
        borderRadius: 32.5,
        backgroundColor: "#419b55",
        justifyContent: "center",
        alignItems: "center",
        elevation: 10,
        shadowColor: "#419b55",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.4,
        shadowRadius: 8,
    },
});