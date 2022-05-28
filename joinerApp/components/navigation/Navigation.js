import React from 'react';
import {StyleSheet, Text, View} from 'react-native'
import {getFocusedRouteNameFromRoute, NavigationContainer} from "@react-navigation/native";
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
import HomeSVG from '../../assets/svg/Toolbar_icon_home.svg';
import ProfileSVG from '../../assets/svg/Toolbar_icon_profile.svg';
import ChatsSVG from '../../assets/svg/Toolbar_icon_chats.svg';
import SearchSVG from '../../assets/svg/Toolbar_icon_search.svg';
import CreateSVG from '../../assets/svg/Toolbar_icon_create.svg';
import CreateNavigation, {} from "../mainComponents/create/CreateNavigation";

function Navigation(props) {
    const Stack = createNativeStackNavigator();
    const Tab = createBottomTabNavigator();

    const iconProps = {
        height: 50,
        width: 50
    }

    function TabNavigation() {
        return (
            <View style={{flex: 1}}>

                <Tab.Navigator screenOptions={({route}) => ({
                    tabBarStyle: {height: 80},
                    headerShown: false,
                    ...tabBarOptions(route)
                })}>
                    <Tab.Screen name={'Home'} component={HomePage}/>
                    <Tab.Screen name={'Search'} component={SearchPage}/>
                    <Tab.Screen name={'Create'}
                                component={CreateNavigation}
                    />
                    <Tab.Screen name={'Chats'} component={ChatsPage}/>
                    <Tab.Screen name={'Profile'} component={ProfilePage}/>
                    <Tab.Screen name={'LoginTabNav'} component={StackNavigation}
                                options={{
                                    tabBarVisible: false,
                                    tabBarButton: () => null
                                }}/>
                </Tab.Navigator>
            </View>
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
                        height: 80,
                        bottom: 0,
                        elevation: 0
                    }
                }
            case 'Create':
                return {
                    tabBarIcon: () => <CreateSVG/>,
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


    const {token, login, logout, userId, ready} = useAuth();
    const isAuthenticated = !!token;

    return (
        <AuthContext.Provider value={{
            token, login, logout, userId, isAuthenticated
        }}>
            <NavigationContainer>
                {!isAuthenticated ? <StackNavigation/> : <TabNavigation/>}
            </NavigationContainer>
        </AuthContext.Provider>

    );
}

export default Navigation;

const styles = StyleSheet.create({
    highlightedIcon: {},
});