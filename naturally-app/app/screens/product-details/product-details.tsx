import { Product, YesNoMaybe } from "@/app/types/product";
import NaturallyPill from "@/components/naturally-pill";
import NaturallyText from "@/components/naturally-text";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import { ScrollView, Image, StyleSheet, View } from "react-native";
import { Appbar, Icon, Text } from "react-native-paper";

export default function ProductDetailsScreen() {
    const router = useRouter();
    
    const params = useLocalSearchParams<{ productJson: string }>();
    const product = JSON.parse(params.productJson) as Product;

    let isVeganBorderColor: string = '';
    let isVeganBackgroundColor: string = '';

    let isVegetarianBorderColor: string = '';
    let isVegetarianBackgroundColor: string = '';

    // vegan checks
    if(product.isVegan == YesNoMaybe.Yes) {
        isVeganBorderColor = yesBorderColor;
        isVeganBackgroundColor = yesBackgroundColor;
    }
    else if(product.isVegan == YesNoMaybe.No) {
        isVeganBorderColor = noBorderColor;
        isVeganBackgroundColor = noBackgroundColor;
    }
    else {
        isVeganBorderColor = maybeBorderColor;
        isVeganBackgroundColor = maybeBackgroundColor;
    }

    // vegetarian checks
    if(product.isVegan == YesNoMaybe.Yes || product.isVegetarian == YesNoMaybe.Yes) {
        isVegetarianBorderColor = yesBorderColor;
        isVegetarianBackgroundColor = yesBackgroundColor;
    }
    else if(product.isVegetarian == YesNoMaybe.No) {
        isVegetarianBorderColor = noBorderColor;
        isVegetarianBackgroundColor = noBackgroundColor;
    }
    else {
        isVegetarianBorderColor = maybeBorderColor;
        isVegetarianBackgroundColor = maybeBackgroundColor;
    }

    return (
        <>
            <Appbar.Header>
                <Appbar.BackAction onPress={() => {router.back()}}/>
            </Appbar.Header>
            <ScrollView>
                    <Image
                        source={{uri: product.imageUrl}}
                        style={styles.image}
                        resizeMode="contain"
                    />
                <View style={{marginLeft: 10, marginRight: 10}}>
                    <NaturallyText variant='title'>{product.name} - {product.brand} - {product.quantity}</NaturallyText>
                    <View style={{marginTop: 10, justifyContent: 'space-evenly', flexDirection: 'row'}}>
                        <NaturallyPill backgroundColor={isVeganBackgroundColor} borderColor={isVeganBorderColor}>
                            <View style={{justifyContent: 'space-evenly', flexDirection: 'row'}}>
                                <Icon source="leaf" size={35} color={isVeganBorderColor} />
                                <NaturallyText variant="large">Vegan</NaturallyText>
                            </View>
                        </NaturallyPill>
                        <NaturallyPill backgroundColor={isVegetarianBackgroundColor} borderColor={isVegetarianBorderColor}>
                            <View style={{justifyContent: 'space-evenly', flexDirection: 'row'}}>
                                <Icon source="food-variant" size={35} color={isVegetarianBorderColor} />
                                <NaturallyText variant="large">Vegetarian</NaturallyText>
                            </View>
                        </NaturallyPill>
                    </View>
                    <View style={{marginTop: 15}}>
                        <NaturallyText variant='medium'>Ingredients: {product.ingredients}</NaturallyText>
                    </View>
                    <View style={{marginTop: 15}}>
                        <NaturallyText variant='small'>Data by <Link href='https://openfoodfacts.org' style={{textDecorationLine: 'underline'}}>Open Food Facts</Link></NaturallyText>
                    </View>
                </View>
            </ScrollView>
        </>
    )
}

const yesBorderColor = '#5C9225';
const noBorderColor = '#D64545';
const maybeBorderColor = '#D1A23D';
const yesBackgroundColor = '#EAF5E1';
const noBackgroundColor = '#FCEAEA';
const maybeBackgroundColor = '#FFF8E5';

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    image: {
        height: 250,
        width: '100%',
        alignSelf: 'center',
        marginTop: 15
    },
    colorGreen: {
        color: 'green'
    }
})