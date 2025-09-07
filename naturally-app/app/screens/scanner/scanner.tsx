import { Image } from 'expo-image';
import { Alert, Keyboard, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { TextInput } from 'react-native';
import { IconButton, PaperProvider, Text } from 'react-native-paper';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { getOpenFoodFactsProductData } from '@/app/clients/open-food-facts-client';

export default function ScannerScreen() {
  const [barcode, setBarcode] = useState('');
  const router = useRouter();

  const getProductData = async (barcode: string) => {
    try {
      const product = await getOpenFoodFactsProductData(barcode);

      if(!product) {
        Alert.alert('Product not found. Consider contributing to Open Food Facts!');
        return;
      }

      router.navigate({pathname: '/screens/product-details/product-details', params: { productJson: JSON.stringify(product) }});
    }
    catch(error: any) {
      console.error(error);
    }
  };

  return (
    <PaperProvider>
      <ParallaxScrollView
        headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
        headerImage={
          <Image
            source={require('@/assets/images/naturally-logo.png')}
            style={styles.logo}
          />
        }>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.container}>
              <Text>Enter a barcode to check:</Text>
              <View style={styles.row}>
                <TextInput 
                  style={styles.input}
                  keyboardType='numeric'
                  onChangeText={newBarcode => setBarcode(newBarcode)}>
                </TextInput>
                <IconButton 
                  mode='contained'
                  icon='magnify'
                  onPress={async () => {console.log('will call now...'); await getProductData(barcode)}}
                  style={styles.iconButton}>
                </IconButton>
              </View>
            </View>
          </TouchableWithoutFeedback>
        
      </ParallaxScrollView>
    </PaperProvider>
    
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
    marginBottom: 8,
  },
  logo: {
    height: 300,
    width: 410,
    top: 0,
    left: 0,
    position: 'absolute',
  },
  input: {
    width: '85%',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "gray",
    backgroundColor: "white"
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  iconButton: {
    borderRadius: 10,
    height: '100%'
  }
});
