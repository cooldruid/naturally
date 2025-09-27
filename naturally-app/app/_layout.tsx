'use client';

import 'react-native-reanimated';

import { Slot } from 'expo-router';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { colors } from './theme';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from '@expo-google-fonts/merriweather/useFonts';
import { Merriweather_400Regular } from '@expo-google-fonts/merriweather/400Regular';
import { Suspense } from 'react';


export default function RootLayout() {
  let [fontsLoaded] = useFonts({
    Merriweather_400Regular 
  });

  if(!fontsLoaded)
    return <View><Text>Loading...</Text></View>

  return (
    <>
      <StatusBar style='dark'/>
      <PaperProvider theme={colors}>
        <ImageBackground source={require('@/assets/images/oldpaper.webp')} 
          style={styles.background}
          resizeMode='cover'
          imageStyle={{opacity: 0.15}}>
            <Slot/>
        </ImageBackground>
      </PaperProvider>
    </>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: colors.colors.background
  },
});