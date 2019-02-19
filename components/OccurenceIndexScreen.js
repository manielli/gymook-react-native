import React, {Component} from "react";
import {Button,Modal,ScrollView,View,TouchableOpacity,Text} from "react-native";
import OccurenceShowScreen from "./OccurenceShowScreen";

class OccurenceIndexScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            occurences: [],
            isModalVisible: false,
            occurenceId: null
        }
    }

    componentDidMount() {
        fetch("http://192.168.1.50:3000/api/v1/occurences")
            .then(res => res.json())
            .then(data => {
                this.setState({
                    occurences: data
                });
            });
    }

    render() {
        const {occurenceId, isModalVisible, occurences} = this.state;
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
                            padding: 25,
                            borderRadius: 10
                        }} >
                            <OccurenceShowScreen occurenceId={occurenceId} />
                            <Button onPress={() => this.setState({isModalVisible: false}) } title="Close" />
                        </View>
                    </View>
                </Modal>

                {occurences.map(occurence => 
                    <View style={{
                        marginVertical: 5,
                        marginHorizontal: 20,
                        paddingHorizontal: 15,
                        paddingVertical: 7.5,
                        borderColor: "maroon",
                        borderWidth: 1,
                        borderRadius: 5
                        }}
                        key={occurence.id} 
                    >
                        <TouchableOpacity onPress={() => this.setState({isModalVisible: true, occurenceId: occurence.id}) } >
                            <Text style={{fontSize: 20}} > This class starting on</Text>
                            <Text style={{fontSize: 20}} > {occurence.start_time} ending on {occurence.end_time} </Text>
                            <Text style={{fontSize: 20}} > {occurence.bookings.count} peope have booked this class so far.</Text>
                            {/* <Text style={{fontSize: 20}} > This class costs: ${occurence.gym_class.cost} </Text> */}
                        </TouchableOpacity>
                        <Text style={{fontSize: 15, color: "lightblue"}} > {occurence.creator_coach.full_name} </Text>
                    </View>    
                )}
            </ScrollView>
        );
    }

};

export default OccurenceIndexScreen;