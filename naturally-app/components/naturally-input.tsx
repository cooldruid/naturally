import React from "react";
import { KeyboardTypeOptions, StyleSheet, TextInput } from "react-native";

export type NaturallyInputProps = {
    keyboardType: KeyboardTypeOptions | undefined;
    onChangeText: ((text: string) => void);
}

const NaturallyInputComponent: React.FC<NaturallyInputProps> = ({keyboardType, onChangeText}) => {
    return <TextInput style={styles.input} keyboardType={keyboardType} onChangeText={onChangeText} />
}

const NaturallyInput = React.memo(NaturallyInputComponent);

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
    height: 47
  }
});