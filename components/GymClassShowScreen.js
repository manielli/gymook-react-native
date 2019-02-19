import React, { Component } from "react";
import { ScrollView, View, Text, Button } from "react-native";

class GymClassShowScreen extends Component {
    constructor(props) {
        super(props);

        this.state={
            gym_class: null,
            loading: true
        }
    }

    fetchGymClass(id) {
        fetch(`http://192.168.1.50:3000/api/v1/gym_classes/${this.props.gym_classId}`)
            .then(res => res.json())
            .then(gym_class => this.setState({gym_class, loading: false}))
    }

    componentDidMount() {
        this.fetchGymClass(this.props.gym_classId);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.gym_classId !== this.props.gym_classId) {
            this.fetchGymClass(this.props.gym_classId);
        }
    }

    render() {
        const { gym_class, loading } = this.state;
        return (
            <ScrollView>
                { loading ? (
                    <Text>Loading...</Text>
                ) : (
                    <>
                        <Text style={{ fontSize: 20, marginBottom: 25 }} >{gym_class.class_type}</Text>
                        <Text style={{ fontSize: 15, marginBottom: 20 }} > Description: {gym_class.description}</Text>
                        <Text style={{ fontSize: 10, marginBottom: 10 }} > Cost: {gym_class.cost} </Text>
                        <Text style={{ fontSize: 10, marginBottom: 10 }} > Maximum Clients: {gym_class.maximum_clients} </Text>
                        <Text style={{ fontSize: 10, marginBottom: 20 }} > Created at {gym_class.created_at}</Text>
                        <Text style={{ fontSize: 10, fontWeight: "bold" }} > By Coach {gym_class.creator_coach.full_name} </Text>
                    </>
                )
                }
            </ScrollView>
        );
    }

};

export default GymClassShowScreen;