import { getOpenFoodFactsProductData } from "../clients/open-food-facts-client";
import showSimpleAsyncAlert from "./alert-service";
import { Product } from "../types/product";

export async function getProductData(
    barcode: string): Promise<Product | undefined> {
    try {
        const product = await getOpenFoodFactsProductData(barcode);

        if(!product) {
            await showSimpleAsyncAlert(
                'Product not found.',
                'Consider contributing to Open Food Facts!');

            console.log('error123');
            
            return undefined;
        }
        return product;
    }
    catch(error: any) {
        await showSimpleAsyncAlert(
                'Error',
                'Unexpected error occurred');
        console.error(error);
        return undefined;
    }
}