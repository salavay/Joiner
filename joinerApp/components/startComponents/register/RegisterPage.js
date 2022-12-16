import React, {useContext, useState} from 'react';
import {StyleSheet, Text, View} from "react-native";
import CustomInput from "../../elements/input/CustomInput";
import CustomButton from "../../elements/button/CustomButton";
import {AuthContext} from "../../../context/AuthContext";
import {useHttp} from "../../../hooks/http.hook";

function RegisterPage({navigation}) {

    const authContext = useContext(AuthContext);
    const {request} = useHttp();
    const [form, setForm] = useState({username: '', email: '', password: ''});

    const changeHandler = (name, text) => {
        setForm({...form, [name]: text});
    }

    const registerHandler = async () => {
        try {
            const data = await request({
                url: '/api/auth/register',
                method: 'POST',
                body: {...form}
            });
            navigation.navigate('Login');
        } catch (e) {
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Register</Text>
            <CustomInput style={styles.input}
                         placeholder={"Your name"} label={'Name'}
                         onChange={changeHandler} name={'name'}
            />
            <CustomInput style={styles.input}
                         placeholder={"username"} label={'Username'}
                         onChange={changeHandler} name={'username'}
            />
            <CustomInput style={styles.input}
                         placeholder={"email"} label={'Email'}
                         onChange={changeHandler} name={'email'}
            />
            <CustomInput style={styles.input}
                         placeholder={"password"} label={'Password'} secureTextEntry={true}
                         onChange={changeHandler} name={'password'}/>
            <CustomButton backgroundColor={'#000000'}
                          text={'Register'}
                          color={'#FFFFFF'}
                          onPress={registerHandler}
                          activeOpacity={0.8}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        padding: 10,
        marginTop: 40,
        flex: 1,
    },
    title: {
        fontFamily: "Comfortaa_700Bold",
        fontSize: 30,
    },
    input: {
        marginBottom: 10
    }
})

export default RegisterPage;
