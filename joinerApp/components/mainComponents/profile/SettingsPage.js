import React, {useContext} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import imageExample from "../../../assets/img/examples/prince-akachi-J1OScm_uHUQ-unsplash.jpg";
import ProfileSVG from '../../../assets/svg/toolbar/Toolbar_icon_profile.svg';
import Geolocation from "../../elements/geolocation/Geolocation";
import AddToFriendSVG from "../../../assets/svg/profile/Add-User.svg";
import ChatSVG from "../../../assets/svg/profile/Chat.svg";
import LogoutSVG from "../../../assets/svg/profile/Logout.svg";
import {AuthContext} from "../../../context/AuthContext";

function SettingsPage({route, navigation}) {
    const user = route.params.user;

    const {logout} = useContext(AuthContext);

    const logoutHandler = async () => {
        await logout();
        navigation.navigate('Start');
    }

    return (
        <View style={styles.container}>
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
                            <Pressable style={styles.actionItem} onPress={() => navigation.navigate('Profile')}>
                                <ProfileSVG {...styles.actionIcon}/>
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
                <View style={{
                    marginTop: 10,
                    width: '100%',
                    borderBottomWidth: 2,
                    borderBottomColor: 'black'
                }}/>
                <View style={styles.settingsWrapper}>
                    <Pressable style={styles.settingItem} onPress={logoutHandler}>
                        <LogoutSVG {...styles.settingIcon}/>
                        <Text style={styles.settingLabel}>
                            LOGOUT
                        </Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );
}

export default SettingsPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10
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
    settingsWrapper: {
        alignItems: "center",
        paddingHorizontal: 30,
        paddingVertical: 30
    },
    settingItem: {
        flexDirection: "row",
        width: '100%',
        alignItems: "center"
    },
    settingIcon: {
        height: 30,
        width: 30
    },
    settingLabel: {
        fontFamily: 'Raleway_700Bold',
        fontSize: 18,
        marginLeft: 30
    }
})