import React, {useContext} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {MeetFormContext} from "./MeetFormContext";
import {commonStyle} from "../../../assets/style/common";
import FullMeet from "../../elements/meets/FullMeet";
import CustomButton from "../../elements/button/CustomButton";



function PreviewMeetPage({navigation}) {
    const [formState, setState, onChangeHandler, image, setImage] = useContext(MeetFormContext);


    return (
        <View style={commonStyle.paddedContainer}>
            <FullMeet {...formState} image={image}/>
            <View style={styles.bottomButtonsWrapper}>
                <CustomButton backgroundColor={'#000000'}
                              text={'Back'}
                              color={'#F2F2F2'}
                              onPress={() => navigation.navigate('CreateSecondPage')}
                              activeOpacity={0.8}
                />
            </View>
        </View>
    );
}

export default PreviewMeetPage;

const styles = StyleSheet.create({
    bottomButtonsWrapper: {
        marginTop: 'auto',
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 20
    }
})

