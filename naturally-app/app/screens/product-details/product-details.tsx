import { Product, YesNoMaybe } from "@/app/types/product";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import { ScrollView, Image, StyleSheet, View, Linking } from "react-native";
import { Appbar, Icon, PaperProvider, Text } from "react-native-paper";

export default function ProductDetailsScreen() {
    const router = useRouter();
    
    const params = useLocalSearchParams<{ productJson: string }>();
    const product = JSON.parse(params.productJson) as Product;

    const styles = StyleSheet.create({
        container: {
            flex: 1
        },
        image: {
            height: '100%',
            width: '100%',
            flex: 1
        },
        colorGreen: {
            color: 'green'
        }
    })

    let isVeganIconSource: string = '';
    let isVeganIconColor: string = '';

    let isVegetarianIconSource: string = '';
    let isVegetarianIconColor: string = '';

    // vegan checks
    if(product.isVegan == YesNoMaybe.Yes) {
        isVeganIconSource = 'check-circle';
        isVeganIconColor = 'green';
    }
    else if(product.isVegan == YesNoMaybe.No) {
        isVeganIconSource = 'close-circle';
        isVeganIconColor = 'red';
    }
    else {
        isVeganIconSource = 'help-circle';
        isVeganIconColor = 'yellow';
    }

    // vegetarian checks
    if(product.isVegan == YesNoMaybe.Yes || product.isVegetarian == YesNoMaybe.Yes) {
        isVegetarianIconSource = 'check-circle';
        isVegetarianIconColor = 'green';
    }
    else if(product.isVegetarian == YesNoMaybe.No) {
        isVegetarianIconSource = 'close-circle';
        isVegetarianIconColor = 'red';
    }
    else {
        isVegetarianIconSource = 'help-circle';
        isVegetarianIconColor = 'yellow';
    }

    return (
    <PaperProvider>
        <Appbar.Header>
            <Appbar.BackAction onPress={() => {router.back()}}/>
        </Appbar.Header>
        <ParallaxScrollView
                headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
                headerImage={
                  <Image
                    source={{uri: product.imageUrl}}
                    style={styles.image}
                    resizeMode="contain"
                  />
                }>
            <Text variant='displaySmall'>{product.name} - {product.brand} - {product.quantity}</Text>
            <View style={{flex: 1, flexDirection: 'row', alignContent: 'space-between'}}>
                <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                    <Text variant='titleLarge'>Vegan:</Text>
                    <Icon source={isVeganIconSource}
                        color={isVeganIconColor}
                        size={40}/>
                </View>
                <View style={{flex: 2, flexDirection: 'row', alignItems: 'center'}}>
                    <Text variant='titleLarge'>Vegetarian:</Text>
                    <Icon source={isVegetarianIconSource} 
                        color={isVegetarianIconColor}
                        size={40}/>
                </View>
            </View>
            <Text variant='bodyLarge'>Ingredients: {product.ingredients}</Text>
            <Text variant='bodyMedium'>Data by <Link href='https://openfoodfacts.org' style={{textDecorationLine: 'underline'}}>Open Food Facts</Link></Text>
        </ParallaxScrollView> 
    </PaperProvider>
    )
}