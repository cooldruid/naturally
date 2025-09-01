import { Image } from 'expo-image';
import { StyleSheet, View } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { TextInput } from 'react-native';
import { IconButton, PaperProvider, Text } from 'react-native-paper';
import { useState } from 'react';
import { useRouter } from 'expo-router';

export default function ScannerScreen() {
  const [barcode, setBarcode] = useState('');
  const router = useRouter();

  const getProductData = async (barcode: string) => {
    try {
      console.log('calling api...');
      const response = await fetch(`https://world.openfoodfacts.org/api/v2/product/${barcode}`);
      const json = await response.json();
      router.push({pathname: '/screens/product-details/product-details', params: { json: JSON.stringify(json) }});
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
        <View style={styles.container}>
          <Text>Enter a barcode to check:</Text>
          <View style={styles.row}>
            <TextInput 
              style={styles.input}
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
