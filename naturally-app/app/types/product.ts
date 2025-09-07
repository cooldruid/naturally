export type Product = {
    barcode: string;
    name: string;
    brand: string;
    quantity: string;
    imageUrl: string;
    isVegan: YesNoMaybe;
    isVegetarian: YesNoMaybe;
    ingredients: string;
}

export enum YesNoMaybe {
    Yes,
    No,
    Maybe
}