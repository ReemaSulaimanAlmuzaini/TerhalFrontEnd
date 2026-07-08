import { Ionicons } from '@expo/vector-icons'; // Import icons for the UI
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker'; // 1. Import ImagePicker
import React, { useRef, useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function CameraScreen() {
    const [permission, requestPermission] = useCameraPermissions();
    const cameraRef = useRef(null);
    const [scanning, setScanning] = useState(false);

    // 1. Permission Check
    if (!permission) {
        return <View />;
    }

    if (!permission.granted) {
        return (
            <View style={styles.permissionContainer}>
                <Text style={styles.message}>We need your permission to show the camera</Text>
                <TouchableOpacity style={styles.permissionBtn} onPress={requestPermission}>
                    <Text style={styles.btnText}>Grant Permission</Text>
                </TouchableOpacity>
            </View>
        );
    }

    // 2. Take Picture Logic
    const takePicture = async () => {
        if (cameraRef.current) {
            try {
                setScanning(true);
                const photo = await cameraRef.current.takePictureAsync({
                    quality: 0.7,
                    base64: true,
                });
                console.log("Photo captured:", photo.uri);

                // ML Placeholder
                Alert.alert("Landmark Detected", "Processing camera image...");
                setScanning(false);
            } catch (e) {
                console.log(e);
                setScanning(false);
            }
        }
    };

    // 3. NEW: Pick from Album Logic
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true, // Let users crop the landmark
            aspect: [4, 3],
            quality: 0.7,
            base64: true,
        });

        if (!result.canceled) {
            console.log("Album image picked:", result.assets[0].uri);
            // ML Placeholder
            Alert.alert("Image Uploaded", "Processing album image...");
        }
    };

    return (
        <View style={styles.container}>
            <CameraView style={styles.camera} facing="back" ref={cameraRef}>

                <View style={styles.overlay}>
                    <View style={styles.topControls}>
                        <Text style={styles.scanText}>Point at a Landmark</Text>
                    </View>

                    <View style={styles.scannerFrame}>
                        {scanning && <View style={styles.scanLine} />}
                    </View>

                    {/* Updated Bottom Controls with Album Button */}
                    <View style={styles.bottomControls}>

                        {/* Album Button */}
                        <TouchableOpacity style={styles.sideBtn} onPress={pickImage}>
                            <Ionicons name="images-outline" size={32} color="#fff" />
                            <Text style={styles.sideBtnText}>Album</Text>
                        </TouchableOpacity>

                        {/* Capture Button */}
                        <TouchableOpacity style={styles.captureBtn} onPress={takePicture}>
                            <View style={styles.captureInner} />
                        </TouchableOpacity>

                        {/* Spacer/Empty View to keep Capture centered */}
                        <View style={styles.sideBtn} />
                    </View>
                </View>

            </CameraView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    camera: {
        flex: 1,
    },
    overlay: {
        flex: 1,
        backgroundColor: 'transparent',
        justifyContent: 'space-between',
        padding: 40,
    },
    topControls: {
        alignItems: 'center',
        marginTop: 20,
    },
    scanText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10,
    },
    scannerFrame: {
        width: 250,
        height: 250,
        alignSelf: 'center',
        borderWidth: 2,
        borderColor: '#419b55',
        borderRadius: 30,
        backgroundColor: 'rgba(65, 155, 85, 0.05)',
    },
    scanLine: {
        height: 2,
        backgroundColor: '#419b55',
        width: '100%',
        shadowColor: '#419b55',
        shadowOpacity: 1,
        shadowRadius: 10,
        elevation: 5,
    },
    bottomControls: {
        flexDirection: 'row', // Align album and capture side-by-side
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 60, // Spacing from floating tab bar
        paddingHorizontal: 20,
    },
    captureBtn: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 4,
        borderColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    captureInner: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#fff',
    },
    sideBtn: {
        width: 60,
        alignItems: 'center',
    },
    sideBtnText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '600',
        marginTop: 5,
    },
    permissionContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    permissionBtn: {
        backgroundColor: '#419b55',
        padding: 15,
        borderRadius: 15,
        marginTop: 20,
    },
    btnText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    message: {
        fontSize: 16,
        textAlign: 'center',
    }
});