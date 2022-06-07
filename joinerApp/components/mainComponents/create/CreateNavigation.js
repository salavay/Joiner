import React from 'react';
import CreateFirstPage from "./CreateFirstPage";
import CreateSecondPage from "./CreateSecondPage";
import {TransitionPresets} from '@react-navigation/stack';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SafeAreaView} from "react-native-safe-area-context";

const Stack = createNativeStackNavigator();

function CreateNavigation({navigation}) {

    return (
        <SafeAreaView style={{flex:1}} edges={['right', 'left', 'top']}>
            <Stack.Navigator screenOptions={{
                headerShown: false,
                ...TransitionPresets.SlideFromRightIOS, // This is where the transition happens
            }}>
                <Stack.Screen name={"CreateFirstPage"} component={CreateFirstPage}/>
                <Stack.Screen name={"CreateSecondPage"} component={CreateSecondPage}
                />
            </Stack.Navigator>
        </SafeAreaView>
    );
}

export default CreateNavigation;
