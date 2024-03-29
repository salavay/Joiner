import React from 'react';
import {StyleSheet} from 'react-native'
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import RegisterPage from "../startComponents/register/RegisterPage";
import StartPage from "../startComponents/start/StartPage";
import LoginPage from "../startComponents/login/LoginPage";
import {useAuth} from "../../hooks/auth.hook";
import {AuthContext} from "../../context/AuthContext";
import HomePage from "../mainComponents/home/HomePage";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import SearchPage from "../mainComponents/search/SearchPage";
import ChatsPage from "../mainComponents/chats/ChatsPage";
import ProfilePage from "../mainComponents/profile/ProfilePage";
import HomeSVG from '../../assets/svg/toolbar/Toolbar_icon_home.svg';
import ProfileSVG from '../../assets/svg/toolbar/Toolbar_icon_profile.svg';
import ChatsSVG from '../../assets/svg/toolbar/Toolbar_icon_chats.svg';
import SearchSVG from '../../assets/svg/toolbar/Toolbar_icon_search.svg';
import CreateSVG from '../../assets/svg/toolbar/Toolbar_icon_create.svg';
import CreateRootPage from "../mainComponents/create/CreateRootPage";
import IntroPage from "../startComponents/intro/IntroPage";
import {SafeAreaView} from "react-native-safe-area-context";
import {TAB_BAR_HEIGHT} from "../Constants";
import FullMeet from "../elements/meets/FullMeet";
import FullMeetPage from "../meet/FullMeetPage";
import SettingsPage from "../mainComponents/profile/SettingsPage";


function Navigation(props) {
    const Stack = createNativeStackNavigator();
    const Tab = createBottomTabNavigator();

    const iconProps = {
        height: 25,
        width: 25
    }

    function TabNavigation() {
        return (
            <SafeAreaView style={{flex: 1}} edges={['right', 'left', 'top']}>
                <Tab.Navigator screenOptions={({route}) => ({
                    tabBarStyle: {height: TAB_BAR_HEIGHT},
                    headerShown: false,
                    tabBarHideOnKeyboard: true,
                    ...tabBarOptions(route)
                })}>
                    <Tab.Screen name={'Home'} component={HomePage}/>
                    <Tab.Screen name={'Search'} component={SearchPage}/>
                    <Tab.Screen name={'Create'}
                                component={CreateRootPage}
                    />
                    <Tab.Screen name={'Chats'} component={ChatsPage}/>
                    <Tab.Screen name={'Profile'} component={ProfilePage}/>
                    <Tab.Screen name={'LoginTabNav'} component={StackNavigation}
                                options={{
                                    tabBarVisible: false,
                                    tabBarButton: () => null
                                }}/>
                    <Tab.Screen name={'FullMeet'} component={FullMeetPage}
                                options={{
                                    tabBarVisible: false,
                                    tabBarButton: () => null
                                }}/>
                    <Tab.Screen name={'Settings'} component={SettingsPage}
                                options={{
                                    tabBarVisible: false,
                                    tabBarButton: () => null
                                }}/>
                </Tab.Navigator>
            </SafeAreaView>
        )
    }

    const tabBarOptions = (route) => {

        switch (route.name) {
            case 'Home':
                return {
                    tabBarIcon: () => <HomeSVG {...iconProps}/>,
                    tabBarLabel: () => null,
                }
            case 'Search':
                return {
                    tabBarIcon: () => <SearchSVG {...iconProps}/>,
                    tabBarLabel: () => null,
                    tabBarStyle: {
                        backgroundColor: 'transparent',
                        position: 'absolute',
                        height: TAB_BAR_HEIGHT,
                        bottom: 0,
                        elevation: 0,
                        borderTopWidth: 0,
                    }
                }
            case 'Create':
                return {
                    tabBarIcon: () => <CreateSVG {...iconProps}/>,
                    tabBarLabel: () => null,
                }
            case 'Profile':
                return {
                    tabBarIcon: () => <ProfileSVG {...iconProps}/>,
                    tabBarLabel: () => null,
                }
            case 'Chats':
                return {
                    tabBarIcon: () => <ChatsSVG {...iconProps}/>,
                    tabBarLabel: () => null,
                }
        }
    }


    function StackNavigation() {
        return (
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name={"Intro"} component={IntroPage}/>
                <Stack.Screen name={"Start"} component={StartPage}/>
                <Stack.Screen name={"Register"}
                              component={RegisterPage}
                              options={{presentation: "card"}}/>
                <Stack.Screen name={"Login"}
                              component={LoginPage}
                              options={{presentation: "card"}}/>
                <Stack.Screen name={"HomeStackNav"}
                              component={TabNavigation}
                              options={{presentation: "card"}}/>
            </Stack.Navigator>
        )
    }


    const {token, login, logout, user, ready} = useAuth();
    const isAuthenticated = !!token;

    return (
        <AuthContext.Provider value={{
            token, login, logout, user, isAuthenticated
        }}>
            <NavigationContainer>
                <StackNavigation/>
            </NavigationContainer>
        </AuthContext.Provider>

    );
}

export default Navigation;

const styles = StyleSheet.create({
    highlightedIcon: {},
});