import React, { Component } from "react";
import { ScrollView, View, Text, Button } from "react-native";
import { GymClass } from "../requests";

class GymClassShowScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state={
            gym_class: null,
            loading: true
        }
    }

    fetchGymClass(id) {
        GymClass.one(id).then(gym_class => {
            this.setState({gym_class, loading: true})
        }).catch((error) => {console.log(error)});
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