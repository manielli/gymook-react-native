import React, {Component} from "react";
import {ScrollView, View, Text, Button} from "react-native";
import { Occurence } from "../requests";

class OccurenceShowScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state={
            occurence: null,
            loading: null
        }
    }

    fetchOccurence(id) {
        this.setState({loading: true, mounted: true});

        Occurence.one(id).then(occurence => {
            this.setState({occurence, loading: false});
        }).catch((error) => {console.log(error);});
                
    }

    componentDidMount() {
        this.mounted = true;
        this.fetchOccurence(this.props.occurenceId);
    }

    componentWillUnmount() {
        this.mounted = null;
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
                    loading || !occurence ? (
                        <Text>Loading...</Text>
                    ) : (
                        <>
                            <Text style={{ 
                                fontSize: 15, 
                                marginBottom: 10 
                                }}
                            > 
                                This class is from {occurence.start_time.split(".000")[0].split("T")[1]} 
                                {" "}to {occurence.end_time.split(".000")[0].split("T")[1]} 
                            </Text>

                            <Text style={{ 
                                fontSize: 15, 
                                fontWeight: "bold" 
                                }} 
                            > 
                                Coach {occurence.creator_coach.full_name} will be teachin this class. 
                            </Text>
                        </>
                    )
                }
            </ScrollView>
        );
    }
};

export default OccurenceShowScreen;