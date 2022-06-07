import React from 'react';
import {View, Text, Platform} from 'react-native';
import {commonStyle} from "../../../assets/style/common";
import MapView, {Marker} from 'react-native-maps';
import {BlurView} from "expo-blur";
import {TAB_BAR_HEIGHT} from "../../navigation/Navigation";


function SearchPage(props) {
    return (
        <View style={{flex: 1}}>
            <MapView style={{flex: 1}}
                     initialRegion={{
                         latitude: 59.963027597305164,
                         longitude: 30.305648291679912,
                         latitudeDelta: 0.0922,
                         longitudeDelta: 0.0421,
                     }}>
                <Marker
                    coordinate={{
                        latitude: 59.963027597305164,
                        longitude: 30.305648291679912
                    }}
                    title={'Title'}
                    description={'Description'}/>
            </MapView>
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