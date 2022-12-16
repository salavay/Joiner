import React from 'react';
import {ImageBackground, StyleSheet, Text, View} from 'react-native';

function Avatar({imageUrl, username}) {
    const avatarExample = require('../../../assets/img/AvatarSample.png');


    return (
        <View style={styles.container}>
            <ImageBackground style={styles.imageContainer}
                             imageStyle={{borderRadius: 1000}}
                             source={imageUrl ? {uri: imageUrl} : avatarExample}/>
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
        height: 25,
        width: 25,
        marginRight: 10
    },
    username: {
        fontSize: 16,
        fontFamily: "Raleway_600SemiBold",
        fontWeight: "bold"
    }
})