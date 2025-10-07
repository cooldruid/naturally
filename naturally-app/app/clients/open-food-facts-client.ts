import axios from "axios";
import { Product, YesNoMaybe } from "../types/product";

const apiClient = axios.create({
    baseURL: 'https://world.openfoodfacts.net/api/v2',
    headers: {
        "Content-Type": "application/json"
    }
});

export async function getOpenFoodFactsProductData(barcode: string): Promise<Product | undefined> {
    try{
        const resp = await apiClient.get<OpenFoodFactsProductResponse>(`/product/${barcode}`, {
            params: {
                product_type: 'all',
                fields: 'image_url,ingredients,ingredients_analysis_tags,product_name,brands,quantity'
            }
        });

        const productResponse = resp.data;
        
        if(productResponse.status == 0)
            return undefined;

        const product: Product = {
            barcode: productResponse.code,
            name: productResponse.product.product_name,
            brand: productResponse.product.brands,
            quantity: productResponse.product.quantity,
            imageUrl: productResponse.product.image_url,
            isVegan: productResponse.product.ingredients_analysis_tags?.includes('en:vegan') ? YesNoMaybe.Yes :
                productResponse.product.ingredients_analysis_tags?.includes('en:non-vegan') ? YesNoMaybe.No :
                YesNoMaybe.Maybe,
            isVegetarian: productResponse.product.ingredients_analysis_tags?.includes('en:vegeterian') ? YesNoMaybe.Yes :
                productResponse.product.ingredients_analysis_tags?.includes('en:non-vegeterian') ? YesNoMaybe.No :
                YesNoMaybe.Maybe,
            ingredients: productResponse.product.ingredients?.map(x => x.text).join(", ") ?? ''
        }
        
        return product;
    }
    catch(error: any) {
        if(error.response.status == 404) {
            return undefined;
        }
    }
}

type OpenFoodFactsProductResponse = {
    code: string;
    product: {
        image_url: string;
        product_name: string;
        brands: string;
        quantity: string;
        ingredients: [
            {
                text: string;
            }
        ];
        ingredients_analysis_tags: string[];
    }
    status: number;
    status_verbose: string;
}
