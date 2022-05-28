import {StyleSheet, View, Text} from 'react-native';
import {
    useFonts,
    Comfortaa_700Bold,
    Comfortaa_400Regular,
    Raleway_600SemiBold,
    Raleway_700Bold,
    Raleway_400Regular
} from "@expo-google-fonts/dev";
import Navigation from "./components/navigation/Navigation";

export default function App() {
    const [fonts] = useFonts({Comfortaa_700Bold, Raleway_700Bold, Raleway_600SemiBold, Raleway_400Regular});

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
            <View style={styles.container}>
                <Navigation/>
            </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        fontFamily: "Comfortaa_700Bold"
    },
});