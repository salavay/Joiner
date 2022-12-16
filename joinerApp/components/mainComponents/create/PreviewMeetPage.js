import React, {useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import {MeetFormContext} from "./MeetFormContext";
import {commonStyle} from "../../../assets/style/common";
import FullMeet from "../../elements/meets/FullMeet";
import CustomButton from "../../elements/button/CustomButton";
import {useHttp} from "../../../hooks/http.hook";
import {AuthContext} from "../../../context/AuthContext";
import {theme} from "../../../context/ThemeContext";


function PreviewMeetPage({navigation}) {
    const {meetForm, image, address} = useContext(MeetFormContext);
    const {token} = useContext(AuthContext);
    const {request} = useHttp();


    const saveEvent = () => {
        const data = new FormData();
        const imageData = {
            uri: image, name: 'MeetCover.jpg', type: 'image/jpg'
        }

        data.append('form', JSON.stringify(meetForm));
        data.append('image', imageData);
        data.append('token', token);

        request({
            url: '/api/meet/create', method: 'Post', body: data, isJson: false
        }).then(r => {
            navigation.navigate('Home')
        }).catch(r => {
            console.log('IMAGE SAVING FAILED!!', r)
        })
    }

    return (
        <View style={[commonStyle.paddedContainer, {paddingHorizontal: 5}]}>
            <FullMeet {...meetForm} image={image} address={address}/>
            <View style={styles.bottomButtonsWrapper}>
                <CustomButton backgroundColor={'#000000'}
                              text={'Back'}
                              color={'#F2F2F2'}
                              onPress={() => navigation.navigate('CreateSecondPage')}
                              activeOpacity={0.8}
                />
                <CustomButton backgroundColor={theme.colors.palette.blue}
                              text={'Save'}
                              color={'#F2F2F2'}
                              onPress={saveEvent}
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

