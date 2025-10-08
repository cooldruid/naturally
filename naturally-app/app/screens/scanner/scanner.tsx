import { Image } from 'expo-image';
import { Keyboard, StyleSheet, TouchableWithoutFeedback, View, ScrollView } from 'react-native';
import { Appbar, Button, Divider, Searchbar } from 'react-native-paper';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { colors } from '@/app/theme';
import NaturallyText from '@/components/naturally-text';
import { getProductData } from '@/app/services/food-scan-service';
import requestPermissions from '@/app/services/permissions-service';
import NaturallySearch from '@/components/naturally-search';

export default function ScannerScreen() {
  const [barcode, setBarcode] = useState('');
  const router = useRouter();

  const navigateToCamera = async () => {
    await requestPermissions();
    router.navigate({pathname: '/screens/camera/camera'});
  }

  const onSearch = async() => {
    const product = await getProductData(barcode);

    if(product) {
      router.navigate({pathname: '/screens/product-details/product-details', params: { productJson: JSON.stringify(product) }})
    }
  }

  return (
      <ScrollView>
        <Appbar.Header style={styles.header}>
          <Image source={require('@/assets/images/logo.png')}
            style={styles.logo}></Image>
          
          <Appbar.Action icon='cog' style={{alignSelf: 'flex-start', left: '40%'}}/>
        </Appbar.Header>
          
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={styles.container}>
            <Button icon='camera' mode='contained'
              style={styles.button} labelStyle={styles.buttonLabel} contentStyle={{height: 60}}
              onPress={navigateToCamera}>Scan barcode</Button>
            <Divider style={{marginBottom: 15, backgroundColor: colors.colors.border, height: 2}}></Divider>
            <NaturallyText variant='medium'>Or, input the barcode yourself:</NaturallyText>
            <View style={styles.row}>
              <NaturallySearch 
                onChangeText={setBarcode}
                value={barcode}
                keyboardType='numeric'
                onSubmit={onSearch}/>
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
    left: '25%',
    marginTop: 18
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
  }
});
