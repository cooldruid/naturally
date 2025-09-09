import { getOpenFoodFactsProductData } from '@/app/clients/open-food-facts-client';
import { useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import { Alert } from 'react-native';
import { Camera, useCameraDevice, useCodeScanner } from 'react-native-vision-camera';

export default function CameraScreen() {
    const [barcode, setBarcode] = useState<string | null>(null);
    const router = useRouter();

    const getProductData = async (barcode: string) => {
        try {
            const product = await getOpenFoodFactsProductData(barcode);

            if(!product) {
                Alert.alert('Product not found.', 'Consider contributing to Open Food Facts!', [
                    {
                        text: 'OK',
                        onPress: () => setBarcode(null)
                    }]);
                
                return;
            }

            router.navigate({pathname: '/screens/product-details/product-details', params: { productJson: JSON.stringify(product) }});
        }
        catch(error: any) {
            console.error(error);
        }
    };

    const device = useCameraDevice('back');

    if(!device){
        Alert.alert('Could not access camera');
        return;
    }

    const lastScans = useRef<string[]>([]);

    const codeScanner = useCodeScanner({
        codeTypes: ['ean-13'],
        onCodeScanned: (codes) => {
            if(barcode)
                return;

            const value = codes[0]?.value;
            if (!value) 
                return;

            lastScans.current.push(value);

            if (lastScans.current.length > 5)
                lastScans.current.shift();

            if (lastScans.current.length >= 3 &&
                lastScans.current.slice(-3).every((v) => v === value)){
                    setBarcode(value);
                    getProductData(value);
                }
        }
    })

    return <Camera style={{ flex: 1 }}
        device={device}
        isActive={true}
        codeScanner={codeScanner}
      />
}