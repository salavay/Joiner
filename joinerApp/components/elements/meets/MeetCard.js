import React from 'react';
import {View, Text, StyleSheet, ImageBackground} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import Avatar from "../avatar/Avatar";
import MapPinSVG  from '../../../assets/svg/MapPin.svg';
import PeopleSVG from '../../../assets/svg/meet/People.svg';
import PriceSVG from '../../../assets/svg/meet/Price.svg';
import TimeSVG from '../../../assets/svg/meet/Time.svg';


function MeetCard({style}) {
    const imageExample = require('../../../assets/img/examples/jason-briscoe-7MAjXGUmaPw-unsplash.jpg');
    const avatarExample = require('../../../assets/img/examples/prince-akachi-J1OScm_uHUQ-unsplash.jpg');

    return (
        <LinearGradient style={{...style, ...styles.container}} colors={['#E58AE5', '#FFB2D9']}>
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
                    <View style={styles.additionalInfoWrapper}>
                        <View style={styles.additionalInfoItem}>
                            <PeopleSVG {...styles.additionalInfoIcon}/>
                            <Text style={styles.additionalInfoText}>9-12</Text>
                        </View>
                        <View style={styles.additionalInfoItem}>
                            <PriceSVG {...styles.additionalInfoIcon}/>
                            <Text style={styles.additionalInfoText}>Free</Text>
                        </View>
                        <View style={styles.additionalInfoItem}>
                            <TimeSVG {...styles.additionalInfoIcon}/>
                            <Text style={styles.additionalInfoText}>2h</Text>
                        </View>
                    </View>
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
        marginBottom: 5
    },
    meetDescription: {
        fontFamily: "Raleway_400Regular",
        height: 50
    },
    additionalInfoWrapper: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
        justifyContent: "space-between"
    },
    additionalInfoItem: {
        flexDirection: "row",
        alignItems:"center",
        marginRight: 5
    },
    additionalInfoIcon: {
        height: 20,
        width: 20,
        marginRight: 5
    },
    additionalInfoText: {
        fontSize: 10
    },
    locationWrapper: {
        alignItems: "center",
        flexDirection: "row",
        marginTop: "auto",
        height: 20
    },
    location: {
        fontSize: 10,
        paddingRight: 10
    },
    segmentWrapper: {
        flex: 1
    }
});