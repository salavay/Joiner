import {StyleSheet} from "react-native";
import {theme} from "../../../context/ThemeContext";


export const meetConstants = {
    containerRadius: 16,
    segmentsColorConfig: {
        gradients: {
            default: theme.colors.gradients.candy,
            sport: theme.colors.gradients.blue,
            standup: theme.colors.gradients.violet,
            hike: theme.colors.gradients.lemon,
            party: theme.colors.gradients.lava,

        },
        colors: {
            default: theme.colors.palette.black,
            sport: theme.colors.palette.blue,
            standup: theme.colors.palette.violet,
            hike: theme.colors.palette.lemon,
            party: theme.colors.palette.lava,
        }
    }
}

export const meetSegments = [
    {value: 'default', name: 'Default'},
    {value: 'sport', name: 'Sports'},
    {value: 'standup', name: 'Stand-Up'},
    {value: 'hike', name: 'Hike'},
    {value: 'party', name: 'Party'},
]


export const meetStyles = StyleSheet.create({
    container: {
        height: 180,
        width: "100%",
        borderRadius: meetConstants.containerRadius,
        padding: 2,
        flexDirection: "row"
    },
    content: {
        padding: 10,
        flex: 10,
        backgroundColor: '#FFF',
        borderRadius: 16,
        flexDirection: "row"
    },
    segmentWrapper: {
        flex: 1
    },
    contentMeetImageWrapper: {
        flex: 5,
        paddingVertical: 10,
    },
    contentMeetImage: {
        flex: 1
    },
    contentMeetInfo: {
        padding: 10,
        flex: 9
    },
    meetTitle: {
        fontSize: 18,
        fontFamily: "Raleway_700Bold",
        fontWeight: "bold",
        marginBottom: 5
    },
    additionalInfoWrapper: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: '60%',
    },
    additionalInfoItem: {
        flexDirection: "row",
        alignItems: "center",
        marginRight: 5
    },
    additionalInfoIcon: {
        height: 20,
        width: 20,
        marginRight: 5
    },
    additionalInfoText: {
        fontSize: 10
    },
    bottomButtonsWrapper: {
        flexDirection: "row",
        justifyContent: "space-between",
        position: "absolute",
        bottom: 20,
        left: 15,
        width: '100%'
    },
})