import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native'

function CustomButton({
                          backgroundColor = '#000000',
                          text,
                          color = '#FFFFFF',
                          activeOpacity = 0.8,
                          onPress,
                          height = 50, width = 150,
                          outlined = false
                      }) {
    const styles = StyleSheet.create({
        button: {
            width: width,
            height: height,

            alignItems: "center",
            justifyContent: "center",

            borderRadius: 16,

            backgroundColor: backgroundColor
        },
        buttonText: {
            fontWeight: "700"
        }
    });

    return (
        <TouchableOpacity
            style={[
                styles.button,
                outlined ? {
                    borderWidth: 2
                } : {}]}
            activeOpacity={activeOpacity}
            onPress={onPress}>
            <Text style={{...styles.buttonText, color}}>
                {text}
            </Text>
        </TouchableOpacity>
    );
}

export default CustomButton;