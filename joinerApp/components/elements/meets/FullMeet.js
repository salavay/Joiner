import React, {useContext} from 'react';
import {StyleSheet, View, ScrollView, ImageBackground, Text, Image, Pressable} from 'react-native';
import {LinearGradient} from "expo-linear-gradient";
import {meetStyles} from "./MeetConstants";
import Avatar from "../avatar/Avatar";
import CustomButton from "../button/CustomButton";
import {theme} from "../../../context/ThemeContext";
import imageExample from "../../../assets/img/examples/jason-briscoe-7MAjXGUmaPw-unsplash.jpg";
import PeopleSVG from "../../../assets/svg/meet/People.svg";
import PriceSVG from "../../../assets/svg/meet/Price.svg";
import TimeSVG from "../../../assets/svg/meet/Time.svg";
import Moment from "moment";

function FullMeet({
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
                      image,
                      style
                  }) {

    const imageExample = require('../../../assets/img/examples/jason-briscoe-7MAjXGUmaPw-unsplash.jpg');
    const avatarExample = require('../../../assets/img/examples/prince-akachi-J1OScm_uHUQ-unsplash.jpg');

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            height: 'auto',
            borderRadius: 16,
            padding: 2,
        },
        infoWrapper: {
            height: 200,
            flexDirection: "row",
            flex: 1
        },
        meetTitle: {
            fontSize: 20,
        },
        avatarAndStatusButtonsWrapper: {
            flex: 1,
            justifyContent: "space-between"
        },
        statusButton: {
            height: 35
        },
        whoIsGoingSegment: {
            marginTop: 10,
            flexDirection: "row",
            alignItems: "center"
        },
        avatarsWrapper: {
            flexDirection: "row",
            marginRight: 20
        },
        avatar: {
            borderWidth: 1,
            borderRadius: 1000,
            marginRight: -10,
            height: 25,
            width: 25,
        },
        whoIsGoingTextWrapper: {
            flex: 1,
            justifyContent: "center"
        },
        whoIsGoingText: {
            fontSize: 8,
            fontFamily: "Raleway_700Bold",
            flexWrap: 'wrap',
        },
        descriptionWrapper: {
            width: '100%'
        },
        descriptionTitle: {
            fontFamily: 'Raleway_600SemiBold',
            fontSize: 18
        },
        descriptionContent: {
            fontFamily: 'Raleway_400Regular'
        },
        dateWrapper: {
            marginTop: 10,
            flexDirection: "row",
            alignItems: "center"
        },
        addToCalendarButton: {
            height: 25,
            width: 120,
            marginLeft: 'auto'
        }
    });

    return (
        <ScrollView style={[{flex: 1}, style]}>
            <LinearGradient style={[meetStyles.container, styles.container]} colors={['#E58AE5', '#FFB2D9']}>
                <View style={[meetStyles.content, {flexDirection: "column"}]}>
                    <View style={{height: 200, flexDirection: "row"}}>
                        <View style={styles.infoWrapper}>
                            <View style={meetStyles.contentMeetImageWrapper}>
                                <ImageBackground imageStyle={{borderRadius: 17}} style={meetStyles.contentMeetImage}
                                                 source={{uri: image}}/>
                            </View>
                            <View style={meetStyles.contentMeetInfo}>
                                <Text style={{...meetStyles.meetTitle, ...styles.meetTitle}}>
                                    {name}
                                </Text>
                                <View style={styles.avatarAndStatusButtonsWrapper}>
                                    <View style={styles.avatarWrapper}>
                                        <Avatar username={'username_example'} image={avatarExample}/>
                                    </View>
                                    <CustomButton
                                        backgroundColor={theme.colors.palette.lavender}
                                        style={styles.statusButton}
                                        text={'I will go!'}
                                        color={theme.colors.text.default}
                                    />
                                    <CustomButton
                                        backgroundColor={theme.colors.palette.turquoise}
                                        style={styles.statusButton}
                                        text={'Maybe'}
                                        color={theme.colors.text.default}
                                    />
                                </View>
                                <View style={styles.whoIsGoingSegment}>
                                    <View style={styles.avatarsWrapper}>
                                        <ImageBackground style={styles.avatar}
                                                         imageStyle={{borderRadius: 1000}}
                                                         source={avatarExample}/>
                                        <ImageBackground style={styles.avatar}
                                                         imageStyle={{borderRadius: 1000}}
                                                         source={avatarExample}/>
                                        <ImageBackground style={styles.avatar}
                                                         imageStyle={{borderRadius: 1000}}
                                                         source={avatarExample}/>
                                    </View>
                                    <View style={styles.whoIsGoingTextWrapper}>
                                        <Text style={styles.whoIsGoingText}>
                                            @scripy, @kelvingrn
                                            and 15 others are going
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
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
                            <Text style={meetStyles.additionalInfoText}>2h</Text>
                        </View>
                    </View>
                    <View style={styles.descriptionWrapper}>
                        <Text style={styles.descriptionTitle}>
                            Description
                        </Text>
                        <Text style={styles.descriptionContent}>
                            {description}
                        </Text>
                    </View>
                    <View style={styles.dateWrapper}>
                        <Text>
                            {Moment(date).format('DD.MM.YYYY HH:mm')}
                        </Text>
                        <CustomButton
                            text={'Add to calendar'}
                            backgroundColor={theme.colors.palette.lavender}
                            color={'#ffffff'}
                            style={styles.addToCalendarButton}
                        />
                    </View>
                </View>
                <View style={meetStyles.segmentWrapper}>

                </View>
            </LinearGradient>
        </ScrollView>

    );
}

export default FullMeet;