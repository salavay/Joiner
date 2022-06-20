import React, {useContext, useState} from 'react';
import {StyleSheet, View, Text, ActivityIndicator} from 'react-native'
import MapView, {Marker} from "react-native-maps";
import MapPinSVG from '../../../assets/svg/MapPin.svg';
import {useHttp} from "../../../hooks/http.hook";
import {debounce} from 'debounce';
import {MeetFormContext} from "./MeetFormContext";
import CustomButton from "../../elements/button/CustomButton";
import {theme} from "../../../context/ThemeContext";


function SelectLocation({navigation}) {

    const coordDeltas = {
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
    }

    const {
        address, setAddress,
        setPickedLocation,
        setLocationPicked
    } = useContext(MeetFormContext);

    const {request} = useHttp();
    const [changingRegion, setChangingRegion] = useState(false);


    const onRegionChange = (e) => {
        setChangingRegion(true);
    }

    const onRegionComplete = (e) => {
        getAddress(e);
    }

    const getAddress = debounce(e => {
        const {
            latitude,
            longitude,
            latitudeDelta,
            longitudeDelta
        } = e;

        request({
            url: `/api/location/getAddress?latitude=${latitude}&longitude=${longitude}`,
            method: 'get'
        }).then(r => {
                setAddress(r.address_components[1].short_name + ' ' + r.address_components[0].short_name)
                setPickedLocation({
                    latitude,
                    longitude,
                    latitudeDelta,
                    longitudeDelta
                });
                setLocationPicked(true);
                setChangingRegion(false);
            }
        )

    }, 300);

    const selectLocationHandler = () => {
        navigation.goBack();
    }

    return (
        <View style={{flex: 1, position: 'relative'}}>
            <MapView style={{flex: 1, zIndex: -1}}
                     initialRegion={{
                         latitude: 59.963027597305164,
                         longitude: 30.305648291679912,
                         ...coordDeltas
                     }}
                     onRegionChange={onRegionChange}
                     onRegionChangeComplete={onRegionComplete}
                     showsUserLocation={true}
                     showsMyLocationButton={true}
            >
            </MapView>
            <View style={styles.markerFixed}>
                <View style={styles.pinWrapper}>
                    <View style={styles.addressTextWrapper}>
                        {changingRegion
                            ? <ActivityIndicator animating={true}/>
                            : <Text style={styles.addressText}>{address}</Text>}
                    </View>
                    <MapPinSVG width={40} height={40}/>
                </View>
            </View>
            <View style={styles.submitButton}>
                <CustomButton
                    text={'Select location'}
                    backgroundColor={theme.colors.palette.violet}
                    color={'#FFF'}
                    style={{width: '100%', height: 60}}
                    onPress={selectLocationHandler}
                />
            </View>
        </View>
    );
}

export default SelectLocation;

const styles = StyleSheet.create({
    markerFixed: {
        left: '45%',
        top: '45%',
        justifyContent: "center",
        alignItems: "center",
        position: 'absolute',
    },
    pinWrapper: {
        position: 'relative',
        justifyContent: "center",
        alignItems: "center",
    },
    addressTextWrapper: {
        borderRadius: 16,
        backgroundColor: '#FFF',
        top: -28,
        alignItems: "center",
        position: "absolute",
    },
    addressText: {
        padding: 2,
        paddingHorizontal: 10,
        width: '100%',
        height: 24
    },
    currentLocationButtonWrapper: {
        position: 'absolute',
        right: 15,
        bottom: 15
    },
    submitButton: {
        position: 'absolute',
        bottom: 20,
        width: '100%',
        paddingHorizontal: 20
    }
})