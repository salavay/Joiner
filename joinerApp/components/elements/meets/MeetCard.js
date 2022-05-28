import React from 'react';
import {View, Text, StyleSheet, ImageBackground} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import Avatar from "../avatar/Avatar";
import MapPinSVG  from '../../../assets/svg/MapPin.svg';


function MeetCard(props) {
    const imageExample = require('../../../assets/img/examples/jason-briscoe-7MAjXGUmaPw-unsplash.jpg');
    const avatarExample = require('../../../assets/img/examples/prince-akachi-J1OScm_uHUQ-unsplash.jpg');

    return (
        <LinearGradient style={styles.container} colors={['#E58AE5', '#FFB2D9']}>
            <View style={styles.content}>
                <View style={styles.contentMeetImageWrapper}>
                    <ImageBackground imageStyle={{borderRadius: 17}} style={styles.contentMeetImage}
                                     source={imageExample}>

                    </ImageBackground>
                </View>
                <View style={styles.contentMeetInfo}>
                    <View style={styles.avatarWrapper}>
                        <Avatar username={'username_example'} image={avatarExample}/>
                    </View>
                    <Text style={styles.meetTitle}>
                        Cooking
                    </Text>
                    <Text style={styles.meetDescription}>
                        lalala nice info thank you very much for reading
                    </Text>
                    <View style={styles.locationWrapper}>
                        <MapPinSVG width={12} height={12}/>
                        <Text style={styles.location} numberOfLines={1} ellipsizeMode='tail'>Veni Simplon-Orient-Express</Text>
                    </View>
                </View>
            </View>
            <View style={styles.segmentWrapper}>

            </View>
        </LinearGradient>
    );
}

export default MeetCard;

const styles = StyleSheet.create({
    container: {
        height: 180,
        width: "100%",
        borderRadius: 16,
        padding: 2,
        flexDirection: "row"
    },
    content: {
        flex: 10,
        backgroundColor: '#FFF',
        borderRadius: 16,
        flexDirection: "row"
    },
    contentMeetImageWrapper: {
        flex: 5,
        paddingVertical: 10,
        paddingLeft: 16,
    },
    contentMeetImage: {
        flex: 1
    },
    contentMeetInfo: {
        padding: 10,
        flex: 9
    },
    avatarWrapper: {
        marginBottom: 5,
    },
    meetTitle: {
        fontSize: 18,
        fontFamily: "Raleway_700Bold",
        fontWeight: "bold",
        marginBottom: 20
    },
    meetDescription: {
        fontFamily: "Raleway_400Regular"
    },
    locationWrapper: {
        alignItems: "center",
        flexDirection: "row",
        marginTop: "auto"
    },
    location: {
        fontSize: 10,
        paddingRight: 10
    },
    segmentWrapper: {
        flex: 1
    }
});