import { getProductData } from '@/app/services/food-scan-service';
import { useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import { Alert, Platform, Text, View } from 'react-native';
import { Icon } from 'react-native-paper';
import { Camera, useCameraDevice, useCodeScanner } from 'react-native-vision-camera';

export default function CameraScreen() {
    const [barcode, setBarcode] = useState<string | null>(null);
    const [isActive, setIsActive] = useState<boolean>(true);

    const router = useRouter();
    const device = useCameraDevice('back');

    if(!device){
        Alert.alert('Could not access camera');
        return;
    }

    const lastScans = useRef<string[]>([]);

    const codeScanner = useCodeScanner({
        codeTypes: ['ean-13'],
        onCodeScanned: async (codes) => {
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
                    const product = await getProductData(value);

                    if(product) {
                        setIsActive(false);

                        setTimeout(
                            () => router.navigate({pathname: '/screens/product-details/product-details', params: { productJson: JSON.stringify(product) }}),
                            500);
                    }
                }
        }
    })

    return <>
        {Platform.OS === 'android' && ( <Text style={{ zIndex: 1, position: 'absolute'}} >{' '}</Text> )} 
        <View style={{opacity:0.4, position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center', zIndex: 20}}>
            <Icon source='barcode-scan' size={280} color='grey'/>
        </View>
        <Camera style={{flex: 1}}
            device={device}
            isActive={isActive}
            codeScanner={codeScanner}
        />
    </>
    
}