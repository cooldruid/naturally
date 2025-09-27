import { Alert } from "react-native";
import { getOpenFoodFactsProductData } from "../clients/open-food-facts-client";
import { useRouter } from "expo-router";
import showSimpleAsyncAlert from "./alert-service";

export async function getAndShowProductData(barcode: string): Promise<boolean> {
    try {
        const router = useRouter();
        const product = await getOpenFoodFactsProductData(barcode);

        if(!product) {
            await showSimpleAsyncAlert(
                'Product not found.',
                'Consider contributing to Open Food Facts!');

            console.log('error123');
            
            return false;
        }

        router.navigate({pathname: '/screens/product-details/product-details', params: { productJson: JSON.stringify(product) }});

        return true;
    }
    catch(error: any) {
        await showSimpleAsyncAlert(
                'Error',
                'Unexpected error occurred');
        console.error(error);
        return false;
    }
}