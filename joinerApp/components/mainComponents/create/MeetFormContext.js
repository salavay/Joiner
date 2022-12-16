import {createContext} from "react";
import {MeetForm} from "../../index";

export const MeetFormContext = createContext({
    meetForm: new MeetForm(),
    setMeetForm: '',
    onChangeHandler: '',
    image: '', setImage: '',
    currentLocation: '', currentLocationErrorMsg: '',
    address: '', setAddress: '',
    pickedLocation: '', setPickedLocation: '',
    locationPicked: '', setLocationPicked: ''
});