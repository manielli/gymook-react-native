import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from "expo";
import Title from "./components/Title";
import GymClassIndexScreen from "./components/GymClassIndexScreen";
import OccurenceIndexScreen from "./components/OccurenceIndexScreen";

export default class App extends React.Component {
  render() {
    return (
      <View style={{flex: 1}} >
        <LinearGradient 
          style={{
            flex: 1, 
            alignItems: "center"
          }} 
          colors={["white", "steelblue", "maroon"]} 
        >
          <Title>Gymook</Title>
          {/* <GymClassIndexScreen /> */}
          <OccurenceIndexScreen />
        </LinearGradient>
      </View>
    );
  }
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
