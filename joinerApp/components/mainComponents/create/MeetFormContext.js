import {createContext} from "react";

export const MeetFormContext = createContext({
    meetForm: '',
    setMeetForm: '',
    onChangeHandler: '',
    image: '', setImage: '',
    currentLocation: '', currentLocationErrorMsg: '',
    address: '', setAddress: '',
    pickedLocation: '', setPickedLocation: '',
    locationPicked: '', setLocationPicked: ''
});