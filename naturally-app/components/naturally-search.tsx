import React from "react";
import { KeyboardTypeOptions, StyleSheet } from "react-native";
import { Searchbar } from "react-native-paper";

export type NaturallySearchProps = {
    keyboardType: KeyboardTypeOptions | undefined;
    value: string;
    onChangeText: ((text: string) => void);
    onSubmit: (() => void);
}

const NaturallySearchComponent: React.FC<NaturallySearchProps> = ({keyboardType, value, onChangeText, onSubmit}) => {
  return <Searchbar
    style={styles.search}
    placeholder="Enter barcode..."
    onChangeText={onChangeText}
    value={value}
    onSubmitEditing={onSubmit}
    keyboardType={keyboardType}
  />
}

const NaturallySearch = React.memo(NaturallySearchComponent);

export default NaturallySearch;

const styles = StyleSheet.create({
  search: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "gray",
    backgroundColor: "white",
    color: 'black',
    flex: 1,
    fontSize: 16
  }
});