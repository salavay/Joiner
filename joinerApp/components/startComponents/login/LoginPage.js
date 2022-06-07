import React, {useContext, useState} from 'react';
import {View, StyleSheet, Text} from 'react-native'
import CustomInput from "../../elements/input/CustomInput";
import CustomButton from "../../elements/button/CustomButton";
import {AuthContext} from "../../../context/AuthContext";
import {useHttp} from "../../../hooks/http.hook";

function LoginPage({navigation}) {

    const auth = useContext(AuthContext);
    const {loading, request} = useHttp();
    const [form, setForm] = useState({userNameOrEmail: '', password: ''});

    const changeHandler = (name, text) => {
        setForm({...form, [name]: text});
    }

    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', {...form});
            auth.login(data.token, data.userId);
            navigation.navigate('HomeStackNav');
        } catch (e) {
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Log in</Text>
            <CustomInput style={styles.input}
                         label={'Username or Email'}
                         onChange={changeHandler} name={'userNameOrEmail'}
            />
            <CustomInput style={styles.input}
                         placeholder={"Some text"} label={'Password'} secureTextEntry={true}
                         onChange={changeHandler} name={'password'}/>
            <CustomButton backgroundColor={'#000000'}
                          text={'Log in'}
                          color={'#FFFFFF'}
                          onPress={loginHandler}
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

export default LoginPage;