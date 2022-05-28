import React, {useContext} from 'react';
import {View, Text} from 'react-native';
import CustomButton from "../../elements/button/CustomButton";
import {AuthContext} from "../../../context/AuthContext";
import {commonStyle} from "../../../assets/style/common"

function ProfilePage({navigation}) {
    const {logout} = useContext(AuthContext);

    return (
        <View style={commonStyle.paddedContainer}>
            <Text>Profile</Text>
            <CustomButton backgroundColor={'#000000'}
                          text={'LOGOUT'}
                          color={'#FFFFFF'}
                          onPress={logout}
                          activeOpacity={0.8}
            />
        </View>
    );
}

export default ProfilePage;