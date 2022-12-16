import React, {useEffect, useState} from 'react';
import {ImageBackground, Pressable, StyleSheet, Text, View} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import Avatar from "../avatar/Avatar";
import PeopleSVG from '../../../assets/svg/meet/People.svg';
import PriceSVG from '../../../assets/svg/meet/Price.svg';
import TimeSVG from '../../../assets/svg/meet/Time.svg';
import {meetConstants, meetStyles} from "./MeetConstants";
import Geolocation from "../geolocation/Geolocation";
import {getDurationString} from "../../utils/time.utils";
import {useHttp} from "../../../hooks/http.hook";


function MeetCard({
                      _id,
                      name,
                      date, endDate,
                      segment,
                      capacity,
                      price,
                      photoUrl,
                      description,
                      isOffline,
                      latitude,
                      longitude,
                      goingUsers,
                      owner,
                      navigation,
                      style
                  }) {

    const meet = {
        _id,
        name,
        date, endDate,
        segment,
        capacity,
        price,
        photoUrl,
        description,
        isOffline,
        latitude,
        longitude,
        goingUsers,
        owner
    }

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

    const openFullMeet = () => {
        navigation.navigate('FullMeet', {
            meet,
            address
        })
    }

    const {request} = useHttp();
    const [address, setAddress] = useState(null);
    useEffect(() => {
        request({
            url: `/api/location/getAddress?latitude=${latitude}&longitude=${longitude}`,
            method: 'get'
        }).then(r => {
            setAddress(r.address_components[1].short_name + ' ' + r.address_components[0].short_name)
        })
    }, [])

    const segmentColor = meetConstants.segmentsColorConfig.colors[segment];
    const segmentColorGradient = meetConstants.segmentsColorConfig.gradients[segment];

    return (
        <LinearGradient style={[style, meetStyles.container]}
                        colors={segmentColorGradient}>
            <Pressable style={meetStyles.content} onPress={openFullMeet}>
                <View style={meetStyles.contentMeetImageWrapper}>
                    <ImageBackground imageStyle={{borderRadius: 17}} style={meetStyles.contentMeetImage}
                                     source={{uri: photoUrl}}>

                    </ImageBackground>
                </View>
                <View style={meetStyles.contentMeetInfo}>
                    <View style={styles.avatarWrapper}>
                        <Avatar username={owner.username} imageUrl={owner.avatarUrl}/>
                    </View>
                    <Text style={styles.meetTitle}>
                        {name}
                    </Text>
                    <Text style={styles.meetDescription}>
                        {description}
                    </Text>
                    <View style={meetStyles.additionalInfoWrapper}>
                        <View style={meetStyles.additionalInfoItem}>
                            <PeopleSVG {...meetStyles.additionalInfoIcon}/>
                            <Text style={meetStyles.additionalInfoText}>{capacity}</Text>
                        </View>
                        <View style={meetStyles.additionalInfoItem}>
                            <PriceSVG {...meetStyles.additionalInfoIcon}/>
                            <Text style={meetStyles.additionalInfoText}>{price}</Text>
                        </View>
                        <View style={meetStyles.additionalInfoItem}>
                            <TimeSVG {...meetStyles.additionalInfoIcon}/>
                            <Text style={meetStyles.additionalInfoText}>{getDurationString(date, endDate)}</Text>
                        </View>
                    </View>
                    <Geolocation geo={address}
                                 pinColor={segmentColor}/>
                </View>
            </Pressable>
            <View style={meetStyles.segmentWrapper}></View>
        </LinearGradient>
    );
}

export default MeetCard;

