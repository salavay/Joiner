import React, {useContext, useState} from 'react';
import {View, Text, StyleSheet} from "react-native";
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
            const data = await request('/api/auth/register', 'POST', {...form});
            navigation.navigate('Login');
        } catch (e) {
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Register</Text>
            <CustomInput style={styles.input}
                         placeholder={"Some text"} label={'Username'}
                         onChange={changeHandler} name={'username'}
            />
            <CustomInput style={styles.input}
                         placeholder={"Some text"} label={'Email'}
                         onChange={changeHandler} name={'email'}
            />
            <CustomInput style={styles.input}
                         placeholder={"Some text"} label={'Password'} secure={true}
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
        flex:1,
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
