import MapPinSVG from "../../../assets/svg/MapPin.svg";
import {StyleSheet, Text, View} from "react-native";
import React from "react";


function Geolocation({geo, ...props}) {
    return (
        <View style={styles.locationWrapper} {...props}>
            <MapPinSVG width={12} height={12}/>
            <Text style={styles.location} numberOfLines={1} ellipsizeMode='tail'>{geo}</Text>
        </View>
    );
}

export default Geolocation;

const styles = StyleSheet.create({
    locationWrapper: {
        alignItems: "center",
        flexDirection: "row",
        marginTop: "auto",
        height: 20
    },
    location: {
        fontSize: 8,
        paddingRight: 10
    }
})

