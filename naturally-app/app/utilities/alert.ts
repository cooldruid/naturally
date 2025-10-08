import { Alert } from "react-native";

export default async function showSimpleAsyncAlert(
    title: string, 
    message: string) {
    const AsyncAlert = async (title: string, message: string) => new Promise((resolve) => {
        Alert.alert(
            title,
            message,
            [
                {
                    text: 'OK',
                    onPress: () => resolve(true)
                },
            ],
            { cancelable: false },
        );
    });

    await AsyncAlert(title, message);
}