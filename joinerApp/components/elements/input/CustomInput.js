import React, {useState} from 'react';
import {View, TextInput, StyleSheet, Text} from 'react-native'

function CustomInput({placeholder, label, style, onChange, secure=false, name}) {
    const [text, setText] = useState(null);

    const onChangeHandler = (text) => {
        onChange(name, text);
    }

    return (
        <View style={style}>
            {label ? <Text style={styles.label}>{label}</Text> : null}
            <View style={styles.inputWrapper}>
                <TextInput placeholder={placeholder} secureTextEntry={secure} onChangeText={onChangeHandler}/>
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
            height: 40,
            width: '100%',
            backgroundColor: '#dadada',
            justifyContent: "center",
            padding: 10
        }
    }
)

export default CustomInput;