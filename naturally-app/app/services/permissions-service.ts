import { PermissionsAndroid } from "react-native";

export default async function requestPermissions() {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
                title: 'Naturally Camera Permission',
                message: 'Naturally requests camera permission. ' +
                    'The camera is only used to scan barcodes easily. ' +
                    'No images captured are stored on your device or outside of it.',
                buttonNeutral: 'Ask Me Later',
                buttonNegative: 'Cancel',
                buttonPositive: 'OK',
            });
    } catch (err) {
        console.warn(err);
    }
}