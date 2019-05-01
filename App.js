import React from "react";
// import { View } from "react-native";
// import { LinearGradient } from "expo";
// import Title from "./components/Title";
import GymClassIndexScreen from "./components/GymClassIndexScreen";
import OccurenceIndexScreen from "./components/OccurenceIndexScreen";
import SignInPage from "./components/SignInPage";
// import { User } from './requests';
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
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     currentUser: null
  //   }

    // this.getCurrentUser = this.getCurrentUser.bind(this);
    // this.destroySession = this.destroySession.bind(this);
  // }

  // destroySession() {
  //   this.setState({
  //     currentUser: null
  //   });

  //   Session.destroy();
  // }

  // getCurrentUser() {
  //   User
  //     .current()
  //     .then(data => {
  //       const {current_user: currentUser} = data;
  //       if (currentUser) {
  //         this.setState({currentUser});
  //       }
  //       this.setState({loading: false});
  //       }
  //     );
  // }

  // componentDidMount() {
  //   this.getCurrentUser;
  // }

  render() {
    return (
      <AppContainer />
      // <SignInPage onSignIn={this.getCurrentUser} />
    );
  }
};
