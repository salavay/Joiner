import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native'

function CustomButton({
                          backgroundColor = '#000000',
                          text,
                          color = '#FFFFFF',
                          activeOpacity = 0.8,
                          onPress,
                          outlined = false,
                          style
                      }) {
    const styles = StyleSheet.create({
        button: {
            width: 150,
            height: 50,

            alignItems: "center",
            justifyContent: "center",

            borderRadius: 16,

            backgroundColor: backgroundColor
        },
        buttonText: {
            fontWeight: "700"
        },
    });

    return (
        <TouchableOpacity
            style={[
                styles.button,
                outlined ? {
                    borderWidth: 2
                } : {},
                style]}
            activeOpacity={activeOpacity}
            onPress={onPress}>
            <Text style={{...styles.buttonText, color}}>
                {text}
            </Text>
        </TouchableOpacity>
    );
}

export default CustomButton;