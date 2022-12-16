import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Platform, View} from 'react-native';
import MapView, {Callout, Marker} from 'react-native-maps';
import {BlurView} from "expo-blur";
import {TAB_BAR_HEIGHT} from "../../Constants";
import {useHttp} from "../../../hooks/http.hook";
import {useIsFocused} from "@react-navigation/native";
import MeetCard from "../../elements/meets/MeetCard";
import MapPinSVG from '../../../assets/svg/MapPin.svg';
import {meetConstants} from "../../elements/meets/MeetConstants";

function SearchPage({navigation}) {

    const {request, loading} = useHttp();
    const [meets, setMeets] = useState(null);
    const isFocused = useIsFocused();


    useEffect(() => {
        if (isFocused) {
            request({
                url: '/api/meet/getAll'
            }).then((meetsFromResp) => {
                    setMeets(meetsFromResp)
                }
            )
        }
    }, [isFocused]);


    return (
        <View style={{flex: 1}}>
            {meets == null &&
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <ActivityIndicator/>
                </View>}
            {meets != null &&
                <MapView style={{flex: 1}}
                         initialRegion={{
                             latitude: 59.963027597305164,
                             longitude: 30.305648291679912,
                             latitudeDelta: 0.0922,
                             longitudeDelta: 0.0421,
                         }}>
                    {meets.map(meet => {
                        return (
                            <Marker key={meet._id}
                                    coordinate={{latitude: meet.latitude, longitude: meet.longitude}}
                                    centerOffset={{x: 0, y: -20}}
                            >
                                <MapPinSVG width={40} height={40}
                                           style={{color: meetConstants.segmentsColorConfig.colors[meet.segment]}}/>
                                <Callout tooltip={true} style={{height: 180, width: 350}} la>
                                    <View style={{flex: 1}}>
                                        <MeetCard key={meet._id} {...meet} navigation={navigation} style={{flex: 1}}/>
                                    </View>
                                </Callout>
                            </Marker>
                        )
                    })}
                </MapView>}
            <BlurView
                style={{
                    position: 'absolute',
                    bottom: 0,
                    width: '100%',
                    height: TAB_BAR_HEIGHT,
                }}
                tint="light"
                intensity={Platform.OS === 'ios' ? 30 : 100}
            >
            </BlurView>
        </View>

    );
}

export default SearchPage;