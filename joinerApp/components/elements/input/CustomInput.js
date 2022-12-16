import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native'

function CustomInput({placeholder, label, style, onChange, name, multiline = false, ...inputProps}) {
    const [text, setText] = useState(null);

    const onChangeHandler = (text) => {
        onChange(name, text);
    }

    const styles = StyleSheet.create({
            container: {},
            label: {
                fontFamily: "Comfortaa_700Bold",
                fontSize: 15
            },
            inputWrapper: {
                borderRadius: 16,
                height: multiline ? 150 : 60,
                width: '100%',
                backgroundColor: '#dadada',
                // justifyContent: multiline ? "flex-start" : "center",
                paddingHorizontal: 10
            },
            input: {
                flex: 1,
                paddingTop: multiline ? 10 : 0,
                paddingBottom: 0,
                textAlignVertical: multiline ? 'top' : 'center'
            }
        }
    )

    return (
        <View style={style}>
            {label ? <Text style={styles.label}>{label}</Text> : null}
            <View style={styles.inputWrapper}>
                <TextInput style={styles.input}
                           placeholder={placeholder}
                           onChangeText={onChangeHandler}
                           multiline={multiline}
                           {...inputProps}/>
            </View>
        </View>
    );
}


export default CustomInput;