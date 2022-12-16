import React, {useContext, useEffect, useState} from 'react';
import {ActivityIndicator, Image, Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import {AuthContext} from "../../../context/AuthContext";
import {commonStyle} from "../../../assets/style/common"
import imageExample from "../../../assets/img/examples/prince-akachi-J1OScm_uHUQ-unsplash.jpg";
import Geolocation from "../../elements/geolocation/Geolocation";
import AddToFriendSVG from "../../../assets/svg/profile/Add-User.svg"
import ChatSVG from "../../../assets/svg/profile/Chat.svg"
import SettingSVG from "../../../assets/svg/profile/Setting.svg"
import {theme} from "../../../context/ThemeContext";
import {useHttp} from "../../../hooks/http.hook";
import {User} from '../../index'
import {useIsFocused} from "@react-navigation/native";
import MeetCard from "../../elements/meets/MeetCard";
import {SceneMap, TabView} from 'react-native-tab-view';

const meetsTypes = ['HOSTING', 'GOING TO', 'ATTENDED']

function ProfilePage({navigation}) {

    const isFocused = useIsFocused();


    const {logout, token, userId} = useContext(AuthContext);
    const {request, loading} = useHttp();
    const [user, setUser] = useState(new User());

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


    const [meetTypeSelected, setMeetTypeSelected] = useState(0);

    const renderMeetsScene = SceneMap({
        hosting: () => <MeetList meets={user.hostingMeets} navigation={navigation}/>,
        going: () => <MeetList meets={user.goingToMeets} navigation={navigation}/>,
        attended: () => <MeetList meets={user.hostingMeets} navigation={navigation}/>
    })
    const [routes, setRoutes] = useState([
        {key: 'hosting', title: 'Hosting'},
        {key: 'going', title: 'Going To'},
        {key: 'attended', title: 'Attended'},
    ]);
    const [tabIndex, setTabIndex] = useState(0);

    return (
        <View style={styles.container}>
            {loading ? <ActivityIndicator/> :
                <View style={{flex: 1}}>
                    <View style={styles.header}>
                        <View style={styles.avatarWrapper}>
                            <Image source={user.avatarUrl ? {uri: user.avatarUrl} : imageExample}
                                   style={styles.avatar}/>
                        </View>
                        <View style={styles.headerInfo}>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={styles.name}>
                                    {user.name}
                                </Text>
                                <Pressable style={styles.actionItem}
                                           onPress={() => navigation.navigate('Settings', {
                                               user
                                           })}>
                                    <SettingSVG {...styles.actionIcon}/>
                                </Pressable>
                            </View>
                            <Text style={styles.username}>
                                @{user.username}
                            </Text>
                            <View style={styles.statusWrapper}>
                                <Text style={styles.status}>
                                    {user.status}
                                </Text>
                            </View>
                            <View style={styles.geoAndActionsWrapper}>
                                <Geolocation geo={'Veni Simplon-Orient-Express'}/>
                                <View style={styles.actionWrapper}>
                                    <AddToFriendSVG {...styles.actionIcon} style={styles.actionItem}/>
                                    <ChatSVG {...styles.actionIcon} style={styles.actionItem}/>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={commonStyle.paddedContainer}>
                        {!loading && <TabView
                            style={{flex: 1}}
                            renderTabBar={props => <MeetTab {...props} setTabIndex={setTabIndex}/>}
                            onIndexChange={setTabIndex}
                            navigationState={{index: tabIndex, routes}}
                            renderScene={renderMeetsScene}/>}
                    </View>

                </View>}
        </View>
    );
}

const MeetList = ({meets, navigation}) => {
    if (meets == null) {
        return null;
    }
    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
        >
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
        </ScrollView>)
}

const MeetTab = ({navigationState, setTabIndex}) => {

    const {index, routes} = navigationState;
    return (
        <View style={{marginBottom: 10}}>
            <View style={styles.meetsTypeSelectionWrapper}>
                {routes.map((route, i) => {
                    return (
                        <Pressable key={route.key} onPress={() => setTabIndex(i)}>
                            <Text style={[styles.meetsTypeText,
                                i === index
                                    ? styles.meetsTypeTextSelected
                                    : styles.meetsTypeTextUnselected]}>
                                {route.title}
                            </Text>
                        </Pressable>
                    );
                })}
            </View>
        </View>
    )
}

const meetListStyles = StyleSheet.create({
    meetCard: {
        marginBottom: 10
    }
})

export default ProfilePage;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
    },
    header: {
        flexDirection: "row",
        width: '100%',
        paddingHorizontal: 5
    },
    avatarWrapper: {
        flexGrow: 1,
        paddingHorizontal: 5
    },
    avatar: {
        height: 120,
        width: 120,
        borderRadius: 1000,
    },
    headerInfo: {
        flexGrow: 8
    },
    name: {
        fontSize: 24,
        fontFamily: 'Raleway_400Regular'
    },
    username: {
        fontSize: 12,
        fontFamily: 'Raleway_400Regular'
    },
    statusWrapper: {
        flex: 1,
        justifyContent: "center"
    },
    status: {
        fontSize: 12,
        fontFamily: 'Raleway_500Medium',
    },
    geoAndActionsWrapper: {
        marginTop: 'auto',
        flexDirection: "row"
    },
    actionWrapper: {
        marginLeft: 'auto',
        flexDirection: "row",
        justifyContent: "space-between"
    },
    actionItem: {
        marginLeft: 5
    },
    actionIcon: {
        height: 30,
        width: 30
    },
    meetsTypeSelectionWrapper: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 35
    },
    meetsTypeText: {
        fontFamily: 'Raleway_700Bold',
        fontSize: 20
    },
    meetsTypeTextSelected: {
        color: theme.colors.text.default,
        textDecorationLine: "underline"
    },
    meetsTypeTextUnselected: {
        color: theme.colors.text.transparent,
    }
});
