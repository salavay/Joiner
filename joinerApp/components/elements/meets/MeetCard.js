import React from 'react';
import {View, Text, StyleSheet, ImageBackground} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import Avatar from "../avatar/Avatar";
import MapPinSVG from '../../../assets/svg/MapPin.svg';
import PeopleSVG from '../../../assets/svg/meet/People.svg';
import PriceSVG from '../../../assets/svg/meet/Price.svg';
import TimeSVG from '../../../assets/svg/meet/Time.svg';
import {meetConstants, meetStyles} from "./MeetConstants";
import Geolocation from "../geolocation/Geolocation";


function MeetCard({
                      name,
                      date,
                      segment,
                      capacity,
                      price,
                      photoUrl,
                      description,
                      isOffline,
                      latitudeCoordinate,
                      longitudeCoordinate,
                      style
                  }) {
    const imageExample = require('../../../assets/img/examples/jason-briscoe-7MAjXGUmaPw-unsplash.jpg');
    const avatarExample = require('../../../assets/img/examples/prince-akachi-J1OScm_uHUQ-unsplash.jpg');

    const styles = StyleSheet.create({
        avatarWrapper: {
            marginBottom: 5,
        },
        meetTitle: {
            fontSize: 18,
            fontFamily: "Raleway_700Bold",
            fontWeight: "bold"
        },
        meetDescription: {
            fontFamily: "Raleway_400Regular",
            height: 40
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

    return (
        <LinearGradient style={[style, meetStyles.container]} colors={meetConstants.segmentsColorConfig.gradients.sports}>
            <View style={meetStyles.content}>
                <View style={meetStyles.contentMeetImageWrapper}>
                    <ImageBackground imageStyle={{borderRadius: 17}} style={meetStyles.contentMeetImage}
                                     source={imageExample}>

                    </ImageBackground>
                </View>
                <View style={meetStyles.contentMeetInfo}>
                    <View style={styles.avatarWrapper}>
                        <Avatar username={'username_example'} image={avatarExample}/>
                    </View>
                    <Text style={styles.meetTitle}>
                        name
                    </Text>
                    <Text style={styles.meetDescription}>
                        lalala nice info thank you very much for reading
                    </Text>
                    <View style={meetStyles.additionalInfoWrapper}>
                        <View style={meetStyles.additionalInfoItem}>
                            <PeopleSVG {...meetStyles.additionalInfoIcon}/>
                            <Text style={meetStyles.additionalInfoText}>9-12</Text>
                        </View>
                        <View style={meetStyles.additionalInfoItem}>
                            <PriceSVG {...meetStyles.additionalInfoIcon}/>
                            <Text style={meetStyles.additionalInfoText}>Free</Text>
                        </View>
                        <View style={meetStyles.additionalInfoItem}>
                            <TimeSVG {...meetStyles.additionalInfoIcon}/>
                            <Text style={meetStyles.additionalInfoText}>2h</Text>
                        </View>
                    </View>
                    <Geolocation geo={'Veni Simplon-Orient-Express'}/>
                </View>
            </View>
            <View style={styles.segmentWrapper}>

            </View>
        </LinearGradient>
    );
}

export default MeetCard;

