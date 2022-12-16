import {Platform} from "react-native";

export const TAB_BAR_HEIGHT = Platform.OS === 'ios' ? 80 : 60;

export const mapPreviewDeltas = {
    latitudeDelta: 0.09,
    longitudeDelta: 0.04,
}