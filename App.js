import React from 'react';
import { Button, Text, View } from 'react-native';
import { LinearGradient } from "expo";
import Title from "./components/Title";
import GymClassIndexScreen from "./components/GymClassIndexScreen";
import OccurenceIndexScreen from "./components/OccurenceIndexScreen";
import SignInPage from "./components/SignInPage";
import { User } from './requests';
import { createStackNavigator, createAppContainer } from "react-navigation";

const AppNavigator = createStackNavigator(
  {
    Classes: OccurenceIndexScreen,
    ClassTemplates: GymClassIndexScreen,
    SignIn: SignInPage
  },
  {
    initialRouteName: "Classes"
  }
);

const AppContainer = createAppContainer(AppNavigator);

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
            alignItems: "center",
            justifyContent: "center"
          }} 
          colors={["white", "steelblue", "maroon"]} 
        >
          <Title>Gymook</Title>
          {/* <SignInPage onSignIn={this.getCurrentUser} /> */}
          {/* <GymClassIndexScreen /> */}
          <OccurenceIndexScreen />
        </LinearGradient>
      </View>
    );
  }
};
