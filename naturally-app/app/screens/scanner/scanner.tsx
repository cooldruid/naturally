import { Image } from 'expo-image';
import { Keyboard, StyleSheet, TouchableWithoutFeedback, View, ScrollView } from 'react-native';
import { Appbar, Button, Divider, IconButton } from 'react-native-paper';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { colors } from '@/app/theme';
import NaturallyText from '@/components/naturally-text';
import NaturallyInput from '@/components/naturally-input';
import { getAndShowProductData } from '@/app/services/food-scan-service';
import requestPermissions from '@/app/services/permissions-service';

export default function ScannerScreen() {
  const [barcode, setBarcode] = useState('');
  const router = useRouter();

  const navigateToCamera = async () => {
    await requestPermissions();
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
            <NaturallyText variant='medium'>Or, input the barcode yourself:</NaturallyText>
            <View style={styles.row}>
              <NaturallyInput 
                keyboardType='numeric'
                onChangeText={newBarcode => setBarcode(newBarcode)}>
              </NaturallyInput>
              <IconButton 
                mode='contained'
                icon='magnify'
                iconColor='white'
                containerColor={colors.colors.primary}
                size={30}
                style={{borderRadius: 10}}
                onPress={async () => {await getAndShowProductData(barcode)}}>
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
