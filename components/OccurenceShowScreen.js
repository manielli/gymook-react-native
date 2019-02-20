import React, {Component} from "react";
import {ScrollView, View, Text, Button} from "react-native";

class OccurenceShowScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state={
            occurence: null,
            loading: null
        }
    }

    fetchOccurence(id) {
        fetch(`http://192.168.1.50:3000/api/v1/occurences/${this.props.occurenceId}`)
            .then(res => res.json())
            .then(occurence => {
                console.log(occurence);
                this.setState({occurence: occurence, loading: false});
            })
                
    }

    componentDidMount() {
        this.fetchOccurence(this.props.occurenceId);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.occurenceId !== this.props.occurenceId ) {
            this.fetchOccurence(this.props.occurenceId);
        }
    }

    render() {
        const {occurence, loading} = this.state;
        return (
            <ScrollView>
                { 
                    loading ? (
                        <Text>Loading...</Text>
                    ) : (
                        <>
                            <Text style={{ fontSize: 10, marginBottom: 10 }} > This class starts at: {occurence.start_time}</Text>
                            <Text style={{ fontSize: 10, marginBottom: 10 }} > ends at: {occurence.end_time} </Text>
                            <Text style={{ fontSize: 10, fontWeight: "bold" }} > Coach {occurence.creator_coach.full_name} will be teachin this class. </Text>
                        </>
                    )
                }
            </ScrollView>
        );
    }
};

export default OccurenceShowScreen;