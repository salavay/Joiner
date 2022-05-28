import React from 'react';
import {View, Text} from "react-native";
import {commonStyle} from "../../../assets/style/common"
import MeetCard from "../../elements/meets/MeetCard";

function HomePage(props) {
    return (
        <View style={commonStyle.paddedContainer}>
            <MeetCard/>
        </View>
    );
}

export default HomePage;