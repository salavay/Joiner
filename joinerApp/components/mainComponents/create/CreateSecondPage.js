import React, {useContext, useState} from 'react';
import {
    ActivityIndicator,
    Image,
    ImageBackground,
    KeyboardAvoidingView,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View
} from 'react-native';
import {commonStyle} from "../../../assets/style/common"
import * as ImagePicker from "expo-image-picker";
import {useHttp} from "../../../hooks/http.hook";
import CustomButton from "../../elements/button/CustomButton";
import CustomInput from "../../elements/input/CustomInput";
import {MeetFormContext} from "./MeetFormContext";
import MapView, {Marker} from "react-native-maps";
import MapPinSVG from '../../../assets/svg/MapPin.svg';
import {mapPreviewDeltas} from "../../Constants";
import {meetStyles} from "../../elements/meets/MeetConstants";

function CreateSecondPage({navigation}) {


    const {
        meetForm, onChangeHandler, image, setImage, address, pickedLocation, locationPicked
    } = useContext(MeetFormContext);

    const imageForPicker = require("../../../assets/img/AddImage.png");
    const {request} = useHttp();

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All, allowsEditing: true, aspect: [4, 3], quality: 1,
        });


        if (!result.cancelled) {
            setImage(result.uri);
        }
    };

    const pressThreshold = 10;
    const [mapPressedIn, setMapPressedIn] = useState({x: 0, y: 0});
    const handlePressOut = e => {
        const newX = e.nativeEvent.locationX, newY = e.nativeEvent.locationY;
        if (Math.abs(newX - mapPressedIn.x) > pressThreshold || Math.abs(newY - mapPressedIn.y) > pressThreshold) {
        } else {
            navigation.navigate('SelectLocation');
        }
    }

    return (<View
        style={commonStyle.paddedContainer}>
        <KeyboardAvoidingView style={{flex: 1}}
                              behavior={'position'} enabled keyboardVerticalOffset={-60}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                overScrollMode={'never'}
                fadingEdgeLength={100}
            >
                <View style={{flex: 1}}>
                    <View style={styles.section}>
                        <Text style={styles.label}>Photo cover</Text>
                        <Pressable onPress={pickImage} style={styles.imagePicker}>
                            {!image ? <ImageBackground source={imageForPicker} style={{flex: 1}}
                            >
                            </ImageBackground> : <Image source={{uri: image}} style={{flex: 1}}/>}
                        </Pressable>
                    </View>
                    <View style={styles.section}>
                        <Text style={styles.label}>Description</Text>
                        <CustomInput name={'description'}
                                     onChange={onChangeHandler}
                                     multiline={true}
                                     numberOfLines={4}
                        />
                    </View>
                    <View style={styles.section}>
                        <Text style={styles.address}>
                            {address}
                        </Text>
                        <View style={styles.mapSection}>
                            {pickedLocation ? <Pressable
                                onPressIn={(e) => setMapPressedIn({
                                    x: e.nativeEvent.locationX, y: e.nativeEvent.locationY
                                })}
                                onPressOut={handlePressOut}
                                style={{flex: 1}}
                            >
                                <MapView
                                    zoomEnabled={false}
                                    scrollEnabled={false}
                                    pitchEnabled={false}
                                    showsUserLocation={true}
                                    showsMyLocationButton={false}
                                    style={[styles.mapView]}
                                    region={{
                                        ...mapPreviewDeltas, ...pickedLocation,
                                    }}
                                >
                                    {locationPicked && <Marker coordinate={pickedLocation}>
                                        <MapPinSVG style={styles.mapPin}
                                                   height={30}
                                                   width={30}
                                        />
                                    </Marker>}
                                </MapView>
                            </Pressable> : <ActivityIndicator animating={true}/>}
                        </View>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
        <View style={meetStyles.bottomButtonsWrapper}>
            <CustomButton backgroundColor={'#000000'}
                          text={'Back'}
                          color={'#F2F2F2'}
                          onPress={() => navigation.navigate('CreateFirstPage')}
                          activeOpacity={0.8}
            />
            <CustomButton backgroundColor={'#563BF5'}
                          text={'Preview'}
                          color={'#ffffff'}
                          onPress={() => navigation.navigate('PreviewMeetPage')}
                          activeOpacity={0.8}
            />
        </View>
    </View>);
}

export default CreateSecondPage;

const styles = StyleSheet.create({
    imagePicker: {
        width: "100%", height: 100, borderRadius: 16, overflow: "hidden"
    }, label: {
        fontFamily: "Raleway_400Regular", fontSize: 20, marginBottom: 10
    }, section: {
        marginBottom: 20
    }, address: {
        fontFamily: 'Raleway_400Regular_Italic', fontSize: 16
    }, mapSection: {
        height: 200, overflow: "hidden", justifyContent: "center", borderRadius: 16,
    }, mapView: {
        flex: 1
    }, mapPin: {
        bottom: 15
    }
})