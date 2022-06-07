import React from 'react';
import {View, Text, StyleSheet, ScrollView} from "react-native";
import {commonStyle} from "../../../assets/style/common"
import MeetCard from "../../elements/meets/MeetCard";
import {SafeAreaView} from "react-native-safe-area-context";

function HomePage(props) {
    return (
        <SafeAreaView style={commonStyle.safeAreaWithTabNavigator} edges={['right', 'left', 'top']}>
            <ScrollView style={commonStyle.paddedContainer}>
                <MeetCard style={styles.card}/>
                <MeetCard style={styles.card}/>
                <MeetCard style={styles.card}/>
                <MeetCard style={styles.card}/>
                <MeetCard style={styles.card}/>
                <MeetCard style={styles.card}/>
            </ScrollView>
        </SafeAreaView>
    );
}

export default HomePage;

const styles = StyleSheet.create({
    card: {
        marginBottom: 10
    }
})