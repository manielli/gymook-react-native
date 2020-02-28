import React from "react";
import { 
    StyleSheet, 
    View, 
    ActivityIndicator
} from "react-native";
import { LinearGradient } from "expo";
import Title from "./Title";

export default class Initializing extends React.Component {
    render() {
        return(
            <View style={{flex: 1}} >
                <LinearGradient 
                    style={styles.container} 
                    colors={["steelblue", "white", "maroon"]} 
                >
                    <Title>Gymook</Title>
                    <ActivityIndicator size="large" />
                </LinearGradient>
            </View>
        )
    }

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    }
})