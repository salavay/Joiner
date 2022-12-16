import React from 'react';
import {View} from 'react-native';
import FullMeet from "../elements/meets/FullMeet";
import {commonStyle} from "../../assets/style/common";
import {meetStyles} from "../elements/meets/MeetConstants";
import CustomButton from "../elements/button/CustomButton";

function FullMeetPage({route, navigation}) {

    const meet = route.params.meet;
    const address = route.params.address;

    return (
        <View style={commonStyle.paddedContainer}>
            <FullMeet {...meet} address={address}/>
            <View style={meetStyles.bottomButtonsWrapper}>
                <CustomButton backgroundColor={'#000000'}
                              text={'Back'}
                              color={'#F2F2F2'}
                              onPress={() => navigation.goBack()}
                              activeOpacity={0.8}
                />
            </View>
        </View>
    );
}

export default FullMeetPage;