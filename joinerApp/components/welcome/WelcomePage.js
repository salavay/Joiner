import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {LinearGradient} from "expo-linear-gradient";

function WelcomePage(props) {
    return (
        <View style={{flex: 1}}>
            <LinearGradient style={styles.gradient}
                            colors={['#FF7AFF','#C45DF4', '#942494']}
                            start={{
                                x: 10,
                                y: 20
                            }}
                            end={{
                                x: 200,
                                y: -50
                            }}
            >
                <Text style={styles.title}>Welcome to Joiner</Text>
            </LinearGradient>
        </View>
    );
}
export default WelcomePage;

const styles = StyleSheet.create({
    gradient: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    title: {
        fontSize: 30
    }
});