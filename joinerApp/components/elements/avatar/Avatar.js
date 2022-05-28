import React from 'react';
import {View, Text, StyleSheet, ImageBackground} from 'react-native';

function Avatar({image, username}) {
    return (
        <View style={styles.container}>
            <ImageBackground style={styles.imageContainer}
                             imageStyle={{borderRadius: 1000}}
                             source={image}/>
            <Text style={styles.username}>
                {username}
            </Text>
        </View>
    );
}
export default Avatar;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center"
    },
    imageContainer: {
        height: 30,
        width: 30,
        marginRight: 10
    },
    username: {
        fontSize: 11,
        fontFamily: "Raleway_600SemiBold",
        fontWeight: "bold"
    }
})