import React, {useContext, useState} from 'react';
import {View, Text, Image, StyleSheet, Pressable} from 'react-native';
import {AuthContext} from "../../../context/AuthContext";
import {commonStyle} from "../../../assets/style/common"
import imageExample from "../../../assets/img/examples/prince-akachi-J1OScm_uHUQ-unsplash.jpg";
import Geolocation from "../../elements/geolocation/Geolocation";
import AddToFriendSVG from "../../../assets/svg/profile/Add-User.svg"
import ChatSVG from "../../../assets/svg/profile/Chat.svg"
import {theme} from "../../../context/ThemeContext";

const meetsTypes = ['HOSTING', 'GOING TO', 'ATTENDED']

function ProfilePage({navigation}) {
    const {logout} = useContext(AuthContext);

    const [meetTypeSelected, setMeetTypeSelected] = useState(0);

    return (
        <View style={commonStyle.paddedContainer}>
            <View style={styles.header}>
                <View style={styles.avatarWrapper}>
                    <Image source={imageExample} style={styles.avatar}/>
                </View>
                <View style={styles.headerInfo}>
                    <View>
                        <Text style={styles.name}>
                            Name
                        </Text>
                    </View>
                    <Text style={styles.username}>
                        @username
                    </Text>
                    <View style={styles.statusWrapper}>
                        <Text style={styles.status}>
                            I know... I’m trying to get the funds.
                        </Text>
                    </View>
                    <View style={styles.geoAndActionsWrapper}>
                        <Geolocation geo={'Veni Simplon-Orient-Express'}/>
                        <View style={styles.actionWrapper}>
                            <AddToFriendSVG/>
                            <ChatSVG/>
                        </View>
                    </View>
                </View>
            </View>
            <View style={styles.meetsTypeSelectionWrapper}>
                {meetsTypes.map((type, index) =>
                    <Pressable key={type} onPress={() => setMeetTypeSelected(index)}>
                        <Text style={[styles.meetsTypeText,
                            index === meetTypeSelected
                                ? styles.meetsTypeTextSelected
                                : styles.meetsTypeTextUnselected]}>
                            {type}
                        </Text>
                    </Pressable>
                )}
            </View>
        </View>
    );
}

export default ProfilePage;
const styles = StyleSheet.create({
    header: {
        flexDirection: "row"
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
    rating: {
        height: 20,
        width: 20
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
        width: 60,
        justifyContent: "space-between"
    },
    meetsTypeSelectionWrapper: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 35
    },
    meetsTypeText: {
        fontFamily: 'Raleway_700Bold',
        fontSize: 15
    },
    meetsTypeTextSelected: {
        color: theme.colors.text.default,
        textDecorationLine: "underline"
    },
    meetsTypeTextUnselected: {
        color: theme.colors.text.transparent,
    }
});
