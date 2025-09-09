import { Image } from 'expo-image';
import { Alert, Keyboard, StyleSheet, TouchableWithoutFeedback, View, ScrollView } from 'react-native';
import { TextInput } from 'react-native';
import { Appbar, Button, Divider, IconButton, Text } from 'react-native-paper';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { getOpenFoodFactsProductData } from '@/app/clients/open-food-facts-client';
import { colors } from '@/app/theme';

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

  const navigateToCamera = () => {
    router.navigate({pathname: '/screens/camera/camera'});
  }

  return (
      <ScrollView>
        <Appbar.Header style={styles.header}>
          <Image source={require('@/assets/images/logo.png')}
            style={styles.logo}></Image>
        </Appbar.Header>
          
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={styles.container}>
            <Button icon='camera' mode='contained'
              style={styles.button} labelStyle={styles.buttonLabel} contentStyle={{height: 60}}
              onPress={navigateToCamera}>Scan barcode</Button>
            <Divider style={{marginBottom: 15, backgroundColor: colors.colors.border, height: 2}}></Divider>
            <Text style={styles.text}>Or, input the barcode yourself:</Text>
            <View style={styles.row}>
              <TextInput 
                style={styles.input}
                keyboardType='numeric'
                onChangeText={newBarcode => setBarcode(newBarcode)}>
              </TextInput>
              <IconButton 
                mode='contained'
                icon='magnify'
                iconColor='white'
                containerColor={colors.colors.primary}
                size={30}
                style={{borderRadius: 10}}
                onPress={async () => {await getProductData(barcode)}}>
              </IconButton>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
    marginLeft: 20,
    marginRight: 20,
    top: '35%'
  },
  header: {
    flex:1, 
    justifyContent: 'center', 
    backgroundColor: colors.colors.surface, 
    borderBottomColor: colors.colors.border, 
    borderBottomWidth: 2,
    paddingEnd: 10,
    height: '15%'
  },
  logo: {
    height: 80,
    width: '50%',
    alignSelf: 'center',
    marginTop: 18
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "gray",
    backgroundColor: "white",
    color: 'black',
    flex: 1,
    fontSize: 16,
    fontFamily: 'Merriweather_400Regular',
    height: 47
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center'
  },
  button: {
    marginTop: 15, 
    marginBottom: 15,
    borderRadius: 10,
    height: 60
  },
  buttonLabel: {
    fontSize: 24,
    fontFamily: 'Merriweather_400Regular'
  },
  text: {
    fontSize: 16,
    fontFamily: 'Merriweather_400Regular',
    textAlign: 'center'
  }
});
