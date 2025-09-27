import React from "react";
import { KeyboardTypeOptions, StyleSheet, TextInput } from "react-native";

export type NaturallyInputProps = {
    keyboardType: KeyboardTypeOptions | undefined;
    onChangeText: ((text: string) => void);
}

const NaturallyInput: React.FC<NaturallyInputProps> = ({keyboardType, onChangeText}) => {
    return <TextInput style={styles.input} keyboardType={keyboardType} onChangeText={onChangeText} />
}

export default NaturallyInput;

const styles = StyleSheet.create({
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
  }
});