import {StyleSheet, View, Text} from 'react-native';
import {
    useFonts,
    Comfortaa_700Bold,
    Comfortaa_400Regular,
    Raleway_600SemiBold,
    Raleway_700Bold,
    Raleway_400Regular,
    Raleway_300Light
} from "@expo-google-fonts/dev";
import Navigation from "./components/navigation/Navigation";
import {SafeAreaProvider} from "react-native-safe-area-context";

export default function App() {
    const [fonts] = useFonts({Comfortaa_700Bold, Raleway_700Bold, Raleway_600SemiBold, Raleway_400Regular, Raleway_300Light});

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

const styles = StyleSheet.create({

});
