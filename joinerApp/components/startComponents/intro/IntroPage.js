import React, {useContext, useEffect} from 'react';
import {Video} from "expo-av";
import {AuthContext} from "../../../context/AuthContext";
import {Pressable, Touchable} from "react-native";

function IntroPage({navigation}) {
    const video = require('../../../assets/video/Intro.mp4')

    const {isAuthenticated} = useContext(AuthContext);
    const navigateNext = () => navigation.navigate(isAuthenticated ? 'HomeStackNav' : 'Start');


    return (
        <Pressable style={{flex: 1}} onPress={navigateNext}>
            <Video style={{flex: 1}} source={video} resizeMode={'cover'}
                   shouldPlay
                   onLoad={() => {
                       setTimeout(navigateNext, 3000);
                   }}
            />
        </Pressable>
    );
}

export default IntroPage;