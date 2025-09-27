import React from "react";
import { StyleSheet, View } from "react-native";

export type NaturallyPillProps = {
    backgroundColor: string;
    borderColor: string;
    children: React.ReactNode;
}

const NaturallyPill: React.FC<NaturallyPillProps> = ({backgroundColor, borderColor, children}) => {
    return (
        <View style={[styles.pill, {backgroundColor: backgroundColor, borderColor: borderColor}]}>
            {children}
        </View>
    );
}

export default NaturallyPill;

const styles = StyleSheet.create({
    pill: {
        borderWidth: 2,
        borderRadius: 50,
        paddingTop: 7,
        paddingBottom: 7,
        paddingLeft: 15,
        paddingRight: 15
    }   
});