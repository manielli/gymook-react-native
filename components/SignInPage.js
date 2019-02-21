import React, {Component}  from "react";
import {Session} from "../requests";
import {View, Button, TextInput, StyleSheet} from "react-native";

class SignInPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            errors: [],
            email: "",
            password: "",
        };

        this.createSession = this.createSession.bind(this);
    }

    onChangeText = (key, val) => {
        this.setState({ [key]: val })
    }

    createSession() {
        const {email, password } = this.state;

        Session.create({
            email: email,
            password: password
        }).then(data => {
            const {onSignIn = () => {}} = this.props;
            console.log(data.id);

            if (typeof data.id === "number") {
                onSignIn();
            } else {
                this.setState({errors: [{message: "Wrong Email or Password"}]})
            }
        })
        .catch((error) => {
            console.log(error);
        })
    }

    render() {
        const {errors} = this.state;

        return(
            <View style={styles.container} >
                {
                    errors.length > 0 ? (
                        <View className="FormErrors" >
                            {errors.map(e => e.message).join(", ")}
                        </View>
                    ) : null
                }
                <TextInput 
                    style={styles.input}
                    placeholder='Email'
                    autoCapitalize="none"
                    placeholderTextColor='white'
                    onChangeText={val => this.onChangeText('email', val)}
                />
                <TextInput 
                    style={styles.input}
                    placeholder='Password'
                    secureTextEntry={true}
                    autoCapitalize="none"
                    placeholderTextColor='white'
                    onChangeText={val => this.onChangeText('password', val)}
                />
                <Button title="Sign In" onPress={this.createSession} />
            </View>
        );
    }

};

const styles = StyleSheet.create({
    input: {
      width: 350,
      height: 55,
      backgroundColor: '#42A5F5',
      margin: 10,
      padding: 8,
      color: 'white',
      borderRadius: 14,
      fontSize: 18,
      fontWeight: '500',
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    }
});

export default SignInPage;