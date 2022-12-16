import React, {useContext, useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View, ActivityIndicator} from "react-native";
import {commonStyle} from "../../../assets/style/common"
import MeetCard from "../../elements/meets/MeetCard";
import {SafeAreaView} from "react-native-safe-area-context";
import {AuthContext} from "../../../context/AuthContext";
import {useHttp} from "../../../hooks/http.hook";
import {User} from "../../index";
import {useIsFocused} from "@react-navigation/native";

function HomePage({navigation}) {
    const {token} = useContext(AuthContext);
    const isFocused = useIsFocused();
    const {request, loading} = useHttp();
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (isFocused) {
            request({
                url: '/api/auth/getCurrentUser',
                method: 'Post',
                body: {
                    token
                }
            }).then(r => {
                setUser(r);
            })
        }

    }, [isFocused])


    return (
        <SafeAreaView style={commonStyle.safeAreaWithTabNavigator} edges={['right', 'left']}>
            {(loading || user == null) && <ActivityIndicator/>}
            {!loading && user != null && <ScrollView style={commonStyle.paddedContainer}>
                <View>
                    <Text style={styles.sectionText}>
                        Your hosting meets:
                    </Text>
                    <MeetList meets={user.hostingMeets} navigation={navigation}/>
                </View>
                <View>
                    <Text style={styles.sectionText}>
                        Your going meets:
                    </Text>
                    <MeetList meets={user.goingToMeets} navigation={navigation}/>
                </View>
            </ScrollView>
            }
        </SafeAreaView>
    );
}

export default HomePage;

const styles = StyleSheet.create({
    sectionText: {
        fontSize: 20,
        fontFamily: 'Raleway_600SemiBold'
    }
})

const MeetList = ({meets, navigation}) => {
    if (meets == null) {
        return null;
    }
    return (
        <View>
            {meets.map(meet => {
                return (
                    <MeetCard
                        key={meet._id}
                        {...meet}
                        navigation={navigation}
                        style={meetListStyles.meetCard}
                    />
                )
            })}
        </View>)
}

const meetListStyles = StyleSheet.create({
    meetCard: {
        marginBottom: 10
    }
})