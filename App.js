import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from "expo";
import Title from "./components/Title";
import GymClassIndexScreen from "./components/GymClassIndexScreen";
import OccurenceIndexScreen from "./components/OccurenceIndexScreen";
import SignInPage from "./components/SignInPage";
import { User } from './requests';


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      loading: true
    }

    this.getCurrentUser = this.getCurrentUser.bind(this);
    this.destroySession = this.destroySession.bind(this);
  }



  destroySession() {
    this.setState({
      currentUser: null
    });

    Session.destroy();
  }

  getCurrentUser() {
    User
      .current()
      .then(data => {
        const {current_user: currentUser} = data;
        if (currentUser) {
          this.setState({currentUser});
        }
        this.setState({loading: false});
        }
      );
  }

  componentDidMount() {
    this.getCurrentUser;
  }

  render() {
    const {currentUser, loading} = this.state;
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
          {/* <SignInPage onSignIn={this.getCurrentUser} /> */}
        </LinearGradient>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
