import { getUserSettings, UserSettings } from "@/app/storage/settings";
import { Product, YesNoMaybe } from "@/app/types/product";
import NaturallyPill from "@/components/naturally-pill";
import NaturallyText from "@/components/naturally-text";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, Image, StyleSheet, View } from "react-native";
import { Appbar, Icon, Text } from "react-native-paper";

export default function ProductDetailsScreen() {
    const [userSettings, setUserSettings] = useState<UserSettings | undefined>(undefined);

    const router = useRouter();

    const fetchUserSettings = async () => {
        const settings = await getUserSettings();
        setUserSettings(settings);
    }
    useEffect(() => {
        fetchUserSettings();
    }, [])
    
    const params = useLocalSearchParams<{ productJson: string }>();
    const product = JSON.parse(params.productJson) as Product;

    const isVeganBorderColor = getPillBorderColor(product.isVegan);
    const isVeganBackgroundColor = getPillBackgroundColor(product.isVegan);

    const isVegetarianBorderColor = getPillBorderColor(product.isVegetarian);
    const isVegetarianBackgroundColor = getPillBackgroundColor(product.isVegetarian);

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
                        {   
                            userSettings?.showVegan && 
                            <NaturallyPill backgroundColor={isVeganBackgroundColor} borderColor={isVeganBorderColor}>
                                <View style={{justifyContent: 'space-evenly', flexDirection: 'row'}}>
                                    <Icon source="leaf" size={35} color={isVeganBorderColor} />
                                    <NaturallyText variant="large">Vegan</NaturallyText>
                                </View>
                            </NaturallyPill>
                        }
                        {
                            userSettings?.showVegetarian &&
                            <NaturallyPill backgroundColor={isVegetarianBackgroundColor} borderColor={isVegetarianBorderColor}>
                                <View style={{justifyContent: 'space-evenly', flexDirection: 'row'}}>
                                    <Icon source="food-variant" size={35} color={isVegetarianBorderColor} />
                                    <NaturallyText variant="large">Vegetarian</NaturallyText>
                                </View>
                            </NaturallyPill>
                        }
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

function getPillBorderColor(yesNoMaybe: YesNoMaybe) {
    let borderColor: string;

    if(yesNoMaybe == YesNoMaybe.Yes) {
        borderColor = yesBorderColor;
    }
    else if(yesNoMaybe == YesNoMaybe.No) {
        borderColor = noBorderColor;
    }
    else {
        borderColor = maybeBorderColor;
    }

    return borderColor;
}

function getPillBackgroundColor(yesNoMaybe: YesNoMaybe) {
    let backgroundColor: string;

    if(yesNoMaybe == YesNoMaybe.Yes) {
        backgroundColor = yesBackgroundColor;
    }
    else if(yesNoMaybe == YesNoMaybe.No) {
        backgroundColor = noBackgroundColor;
    }
    else {
        backgroundColor = maybeBackgroundColor;
    }

    return backgroundColor;
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