import React, {useState} from 'react';
import {View, Text, Pressable, ImageBackground, Image, StyleSheet} from 'react-native';
import {commonStyle} from "../../../assets/style/common"
import * as ImagePicker from "expo-image-picker";


function CreateSecondPage({navigation}) {
    const [image, setImage] = useState(null);

    const imageForPicker = require("../../../assets/img/AddImage.png");

    const pickImage = async () => {
        console.log('AUF');
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
            setImage(result.uri);
        }
    };

    return (
        <View style={commonStyle.paddedContainer}>
            <View style={styles.section}>
                <Text style={styles.label}>Photo cover</Text>
                <Pressable onPress={pickImage} style={styles.imagePicker}>
                    {!image ?
                        <ImageBackground source={imageForPicker} style={{flex: 1}}
                        >
                        </ImageBackground>
                        :
                        <Image source={{uri: image}} style={{flex: 1}}/>
                    }
                </Pressable>
            </View>
            <View style={styles.section}>
                <Text style={styles.label}>Description</Text>
            </View>
            <View style={styles.section}>

            </View>
        </View>
    );
}

export default CreateSecondPage;

const styles = StyleSheet.create({
    imagePicker: {
        width: "100%",
        height: 100,
        borderRadius: 16,
        overflow: "hidden"
    },
    label: {
        fontFamily: "Raleway_400Regular",
        fontSize: 20,
        marginBottom: 10
    },
    section: {
        marginBottom: 20
    }
})