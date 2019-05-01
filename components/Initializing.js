import React from "react";
import { 
    StyleSheet, 
    View, 
    ActivityIndicator
} from "react-native";
import { LinearGradient } from "expo";
import Title from "./Title";
// import {User} from "../requests";

export default class Initializing extends React.Component {
    // constructor(props) {
    //     super(props);

    //     this.state = {
    //         // currentUser: null,
    //         // loading: true
    //     }

    //     // this.getCurrentUser = this.getCurrentUser.bind(this);
    // }

    // componentDidMount() {
    //     this.getCurrentUser;
    // }

    // getCurrentUser() {
    //     User
    //         .current()
    //         .then(data => {
    //             const {current_user: currentUser} = data;
    //             if (currentUser) {
    //                 this.setState({currentUser});
    //             }
    //             this.setState({loading: false})
    //         })
    //         .catch((error) => console.log(error));
    // }

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