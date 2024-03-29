import React from 'react';
import {ImageBackground, StyleSheet, Text, View} from "react-native";
import CustomButton from "../../elements/button/CustomButton";


function StartPage({navigation}) {

    const backgroundImage = require('../../../assets/img/start/startPageBackground.jpeg');

    const titleImage = require('../../../assets/img/start/startTitleBackground.png');

    return (
        <View style={styles.container}>
            <ImageBackground style={styles.titleWrapper} source={backgroundImage}>
                <ImageBackground source={titleImage}
                                 style={styles.titleImageStyle}>
                    <Text style={styles.title}>
                        Joiner
                    </Text>
                </ImageBackground>
            </ImageBackground>
            <View style={styles.buttonsWrapper}>
                <CustomButton text={'LOG IN'}
                              onPress={() => {
                                  navigation.navigate('Login')
                              }}
                />
                <CustomButton backgroundColor={'#FFFFFF'}
                              text={'REGISTER'}
                              color={'#000000'}
                              onPress={() => {
                                  navigation.navigate('Register')
                              }}
                              activeOpacity={0.4}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        flex: 1,
    },
    titleWrapper: {
        flex: 8,
        justifyContent: "center",
        alignItems: "center",
    },
    titleImageStyle: {
        height: 150,
        width: 250,
        padding: 20,


        justifyContent: "center",
        alignItems: "center"
    },
    title: {
        fontSize: 40,
        fontWeight: "bold",
        top: -10
    },
    buttonsWrapper: {
        flex: 1,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: 20
    },

})

export default StartPage;