import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native'

function CustomButton({backgroundColor,
                          text,
                          color,
                          activeOpacity=0.4,
                          onPress,
                          height=50, width=150}) {
    const styles = StyleSheet.create({
        button: {
            width: width,
            height: height,

            alignItems: "center",
            justifyContent: "center",

            borderRadius: 16,
            borderWidth: 2,

            backgroundColor: backgroundColor
        },
        buttonText: {
            fontWeight: "700"
        }
    });

    return (
        <TouchableOpacity style={styles.button}
                            activeOpacity={activeOpacity}
                            onPress={onPress}>
            <Text style={{...styles.buttonText, color}}>
                {text}
            </Text>
        </TouchableOpacity>
    );
}

export default CustomButton;