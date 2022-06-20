import React, {useEffect, useState} from 'react';
import CreateFirstPage from "./CreateFirstPage";
import CreateSecondPage from "./CreateSecondPage";
import {TransitionPresets} from '@react-navigation/stack';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {MeetFormContext} from "./MeetFormContext";
import PreviewMeetPage from "./PreviewMeetPage";
import {meetSegments} from "../../elements/meets/MeetConstants";
import SelectLocation from "./SelectLocation";
import * as Location from "expo-location";

const Stack = createNativeStackNavigator();

function CreateNavigation({navigation}) {

    const formInit = {
        name: '',
        date: new Date(),
        segment: meetSegments[0],
        capacity: -1,
        price: -1,
        photoUrl: '',
        description: '',
        isOffline: false,
        latitudeCoordinate: -1,
        longitudeCoordinate: -1
    }

    const [meetForm, setMeetForm] = useState(formInit);
    const [image, setImage] = useState(null);
    const onChangeHandler = (name, value) => {
        console.log('Name = ', name, "Value = ", value);
        setMeetForm({...meetForm, [name]: value});
    }

    const [currentLocationErrorMsg, setCurrentLocationErrorMsg] = useState(null);
    const [address, setAddress] = useState(null);
    const [pickedLocation, setPickedLocation] = useState(null);
    const [locationPicked, setLocationPicked] = useState(false);
    useEffect(() => {
        (async () => {
            let {status} = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setCurrentLocationErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            const newLocation = {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude
            };
            setPickedLocation(newLocation);
        })();
    }, []);

    return (
        <MeetFormContext.Provider value={{
            meetForm, setMeetForm,
            onChangeHandler,
            image, setImage,
            currentLocationErrorMsg,
            address, setAddress,
            pickedLocation, setPickedLocation,
            locationPicked, setLocationPicked
        }}>
            <Stack.Navigator screenOptions={{
                headerShown: false,
                ...TransitionPresets.SlideFromRightIOS, // This is where the transition happens
            }}>
                <Stack.Screen name={"CreateFirstPage"} component={CreateFirstPage}/>
                <Stack.Screen name={"CreateSecondPage"} component={CreateSecondPage}/>
                <Stack.Screen name={"PreviewMeetPage"} component={PreviewMeetPage}/>
                <Stack.Screen name={"SelectLocation"} component={SelectLocation}/>
            </Stack.Navigator>
        </MeetFormContext.Provider>
    );
}

export default CreateNavigation;
