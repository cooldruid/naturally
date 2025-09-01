import { useLocalSearchParams } from "expo-router";
import { ScrollView } from "react-native";
import { PaperProvider, Text } from "react-native-paper";

export default function ProductDetailsScreen() {
    const json = useLocalSearchParams<{ json: string }>();

    return (
    <PaperProvider>
        <ScrollView>
            <Text>json: {json.json}</Text>
        </ScrollView> 
    </PaperProvider>
    )
}