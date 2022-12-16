import React, {useContext, useEffect, useState} from 'react';
import {ImageBackground, ScrollView, StyleSheet, Text, View} from 'react-native';
import {LinearGradient} from "expo-linear-gradient";
import {meetConstants, meetStyles} from "./MeetConstants";
import Avatar from "../avatar/Avatar";
import CustomButton from "../button/CustomButton";
import {theme} from "../../../context/ThemeContext";
import PeopleSVG from "../../../assets/svg/meet/People.svg";
import PriceSVG from "../../../assets/svg/meet/Price.svg";
import TimeSVG from "../../../assets/svg/meet/Time.svg";
import Moment from "moment";
import MapView, {Marker} from "react-native-maps";
import MapPinSVG from "../../../assets/svg/MapPin.svg";
import {mapPreviewDeltas} from "../../Constants";
import {getDurationString} from "../../utils/time.utils";
import {AuthContext} from "../../../context/AuthContext";
import {useHttp} from "../../../hooks/http.hook";
import {useIsFocused} from "@react-navigation/native";

function FullMeet({
                      _id,
                      name,
                      date,
                      endDate,
                      segment,
                      capacity,
                      price,
                      photoUrl,
                      description,
                      isOffline,
                      latitude,
                      longitude,
                      owner = {},
                      image,
                      address,
                      style
                  }) {

    const {user} = useContext(AuthContext);
    const {request} = useHttp();
    const [goingUsers, setGoingUsers] = useState([]);
    const isFocused = useIsFocused();

    useEffect(() => {
        if (_id != null && isFocused) {
            request({
                url: `/api/meet/getGoingById?id=${_id}`
            }).then(r => {
                setGoingUsers(r);
                setIsUserGoingTo(r.findIndex(goingUser => goingUser._id === user._id) >= 0);
            })
        }
    }, [isFocused]);

    const updateGoingToMeet = () => {
        if (_id == null) return;
        setUpdatingGoing(true);
        request({
            url: '/api/meet/updateGoingToMeet',
            method: 'Post',
            body: {
                userId: user._id,
                meetId: _id
            }
        }).then((r) => {
            console.log('going: ', r)
            setIsUserGoingTo(r);
            setUpdatingGoing(false);
        })
    }
    const [updatingGoing, setUpdatingGoing] = useState(false);
    let isUserGoingToInit = goingUsers.findIndex(goingUser => goingUser._id === user._id) >= 0;
    const [isUserGoingTo, setIsUserGoingTo] = useState(isUserGoingToInit);

    let imageExampleUri = '../../../assets/img/examples/jason-briscoe-7MAjXGUmaPw-unsplash.jpg';
    const imageExample = require(imageExampleUri);

    const segmentColor = meetConstants.segmentsColorConfig.colors[segment];
    const segmentColorGradient = meetConstants.segmentsColorConfig.gradients[segment];

    const avatarExample = '../../../assets/img/AvatarSample.png';


    return (
        <ScrollView style={[{flex: 1}, style]}>
            <LinearGradient style={[meetStyles.container, styles.container]} colors={segmentColorGradient}>
                <View style={[meetStyles.content, {flexDirection: "column"}]}>
                    <View style={{height: 200, flexDirection: "row"}}>
                        <View style={styles.infoWrapper}>
                            <View style={meetStyles.contentMeetImageWrapper}>
                                <ImageBackground imageStyle={{borderRadius: 17}} style={meetStyles.contentMeetImage}
                                                 source={{uri: photoUrl || image}}/>
                            </View>
                            <View style={meetStyles.contentMeetInfo}>
                                <Text style={{...meetStyles.meetTitle, ...styles.meetTitle}}>
                                    {name}
                                </Text>
                                <View style={styles.avatarAndStatusButtonsWrapper}>
                                    <View style={styles.avatarWrapper}>
                                        <Avatar username={owner.username || user.username} imageUrl={owner.avatarUrl}/>
                                    </View>
                                    <CustomButton
                                        backgroundColor={theme.colors.palette.lavender}
                                        style={styles.statusButton}
                                        text={isUserGoingTo ? 'I won\'t go' : 'I will go!'}
                                        color={theme.colors.text.default}
                                        onPress={updateGoingToMeet}
                                        loading={updatingGoing}
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
                                        {goingUsers.splice(3).map(user => {
                                            return (
                                                <ImageBackground
                                                    key={user._id}
                                                    style={styles.avatar}
                                                    imageStyle={{borderRadius: 1000}}
                                                    source={{uri: user.avatarUrl}}/>
                                            )
                                        })}
                                    </View>
                                    <View style={styles.whoIsGoingTextWrapper}>
                                        <Text style={styles.whoIsGoingText}>
                                            {goingUsers.splice(3).map(user => user.username).join(', ')}
                                            {goingUsers?.length > 3 && ` and ${goingUsers?.length - 3} others are going`}
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
                            <Text style={meetStyles.additionalInfoText}>{getDurationString(date, endDate)}</Text>
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
                    <View style={styles.mapSection}>
                        <MapView
                            zoomEnabled={false}
                            scrollEnabled={false}
                            pitchEnabled={false}
                            style={{flex: 1}}
                            region={{
                                ...mapPreviewDeltas,
                                longitude, latitude
                            }}
                        >
                            <Marker coordinate={{longitude, latitude}} centerOffset={{x: 0, y: -20}}>
                                <MapPinSVG style={{color: segmentColor}}
                                           height={30}
                                           width={30}
                                />
                            </Marker>
                        </MapView>
                    </View>
                    <Text>
                        {address}
                    </Text>
                </View>
                <View style={meetStyles.segmentWrapper}>
                </View>
            </LinearGradient>
        </ScrollView>

    );
}

export default FullMeet;

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
    },
    mapSection: {
        marginTop: 10,
        overflow: "hidden",
        justifyContent: "center",
        borderRadius: 16,
        height: 200
    }
});