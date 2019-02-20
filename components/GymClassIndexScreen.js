import React, { Component } from "react";
import { Button, Modal, ScrollView, View, TouchableOpacity, Text } from "react-native";
import GymClassShowScreen from "./GymClassShowScreen";

class GymClassIndexScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gym_classes: [],
            isModalVisible: false,
            gym_classId: null
        };
    }

    componentDidMount() {
        fetch("http://192.168.1.50:3000/api/v1/gym_classes")
            .then(res => res.json())
            .then(data => {
                this.setState({
                    gym_classes: data
                });
            });
    }

    render() {
            const { gym_classId, isModalVisible, gym_classes } = this.state;
            return(
                <ScrollView>
                    <Modal animationType="fade" transparent visible={isModalVisible} >
                        <View style={{
                            flex: 1,
                            backgroundColor: "rgba(0,0,0,0.2)",
                            alignItems: "center",
                            justifyContent: "center",
                            paddingHorizontal: 50,
                            paddingVertical: 150
                        }} >
                            <View style={{
                                width: "100%",
                                height: "100%",
                                backgroundColor: "whitesmoke",
                                padding: 30,
                                borderRadius: 10
                            }} >
                                <GymClassShowScreen gym_classId={gym_classId} />
                                <Button  onPress={() => this.setState({isModalVisible: false}) } title="Close" />
                            </View>
                        </View>
                    </Modal>

                    {gym_classes.map(gym_class => 
                        <View style={{
                            marginVertical: 5,
                            marginHorizontal: 20,
                            paddingHorizontal: 15,
                            paddingVertical: 7.5,
                            borderColor: "gainsboro",
                            borderWidth: 1,
                            borderRadius: 5
                        }} 
                        key={gym_class.id}
                        >
                        <TouchableOpacity onPress={() => this.setState({isModalVisible: true, gym_classId: gym_class.id}) } >
                            <Text style={{fontSize: 20}} >{gym_class.class_type}</Text>
                        </TouchableOpacity>
                        <Text style={{fontSize: 15, color: "lightblue"}} > {gym_class.creator_coach.full_name} </Text>
                        </View>    
                    )}
                </ScrollView>
            );
    }

}
export default GymClassIndexScreen;