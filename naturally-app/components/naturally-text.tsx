import React from "react";
import { StyleSheet, Text } from "react-native";

export type TextVariant = 'title' | 'large' | 'medium' | 'small';

export type NaturallyTextProps = {
    variant: TextVariant;
    children: React.ReactNode;
}

const NaturallyText: React.FC<NaturallyTextProps> = ({variant = 'medium', children}) => {
    let sizeStyle;
    switch(variant) { 
        case 'title': { 
            sizeStyle = styles.title;
            break; 
        } 
        case 'large': { 
            sizeStyle = styles.large;
            break; 
        } 
        case 'medium': { 
            sizeStyle = styles.medium;
            break; 
        } 
        case 'small': { 
            sizeStyle = styles.small;
            break; 
        } 
        default: { 
            sizeStyle = styles.medium;
            break; 
        } 
    } 

    return <Text style={[styles.text, sizeStyle]}>{children}</Text>
}

export default NaturallyText;

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Merriweather_400Regular'
  },
  title: {
    fontSize: 26,
    textAlign: 'center'
  },
  large: {
    fontSize: 20
  },
  medium: {
    fontSize: 16
  },
  small: {
    fontSize: 12
  }
});