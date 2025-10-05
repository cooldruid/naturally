import { getAndShowProductData } from '@/app/services/food-scan-service';
import { useRef, useState } from 'react';
import { Alert, View } from 'react-native';
import { Camera, useCameraDevice, useCodeScanner } from 'react-native-vision-camera';

export default function CameraScreen() {
    const [barcode, setBarcode] = useState<string | null>(null);
    const [isScanning, setIsScanning] = useState<boolean>(true);

    const device = useCameraDevice('back');
    const cameraRef = useRef<Camera>(null);

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
                    const isSuccess = await getAndShowProductData(value, () => setIsScanning(false));

                    if(!isSuccess) {
                        setBarcode(null);
                    }
                }
        }
    })

    if(!isScanning)
        return <View/>

    return <Camera style={{ flex: 1 }}
        ref={cameraRef}
        device={device}
        isActive={isScanning}
        codeScanner={codeScanner}
      />
}