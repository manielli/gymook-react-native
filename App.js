import React from "react";
import GymClassIndexScreen from "./components/GymClassIndexScreen";
import OccurenceIndexScreen from "./components/OccurenceIndexScreen";
import SignInPage from "./components/SignInPage";
import { 
  createBottomTabNavigator, 
  createAppContainer 
} from "react-navigation";
import Initializing from "./components/Initializing";

const AppNavigator = createBottomTabNavigator(
  {
    Initializing: { screen: Initializing },
    Classes: { screen: OccurenceIndexScreen },
    ClassTemplates: { screen: GymClassIndexScreen },
    SignIn: { screen: SignInPage },
  },
  {
    initialRouteName: "Classes",
    defaultNavigationOptions: {
      tabBarVisible: false
    }
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return (
      <AppContainer />
    );
  }
};
