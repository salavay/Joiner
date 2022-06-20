import {StyleSheet, View, Text} from 'react-native';
import {
    useFonts,
    Comfortaa_700Bold,
    Comfortaa_400Regular,
    Raleway_400Regular_Italic,
    Raleway_400Regular,
    Raleway_500Medium,
    Raleway_600SemiBold,
    Raleway_700Bold,
    Raleway_300Light
} from "@expo-google-fonts/dev";
import Navigation from "./components/navigation/Navigation";
import {SafeAreaProvider} from "react-native-safe-area-context";

export default function App() {
    const [fonts] = useFonts({
        Comfortaa_700Bold,
        Raleway_300Light,
        Raleway_400Regular,
        Raleway_400Regular_Italic,
        Raleway_500Medium,
        Raleway_700Bold,
        Raleway_600SemiBold,
    });

    if (!fonts) {
        return (
            <View>
                <Text>
                    Loading...
                </Text>
            </View>
        )
    }
    return (
        <SafeAreaProvider>
            <Navigation/>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({});
