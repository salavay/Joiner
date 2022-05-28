import React, {useState} from 'react';
import {View, TextInput, StyleSheet, Text} from 'react-native'

function CustomInput({placeholder, label, style, onChange, name, ...inputProps}) {
    const [text, setText] = useState(null);

    const onChangeHandler = (text) => {
        onChange(name, text);
    }

    return (
        <View style={style}>
            {label ? <Text style={styles.label}>{label}</Text> : null}
            <View style={styles.inputWrapper}>
                <TextInput placeholder={placeholder} onChangeText={onChangeHandler} {...inputProps}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
        container: {

        },
        label: {
            fontFamily: "Comfortaa_700Bold",
            fontSize: 15
        },
        inputWrapper: {
            borderRadius: 16,
            height: 50,
            width: '100%',
            backgroundColor: '#dadada',
            justifyContent: "center",
            paddingHorizontal: 10,
            paddingVertical: 5
        }
    }
)

export default CustomInput;