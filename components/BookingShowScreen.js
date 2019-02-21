import React, {Component} from "react";
import {View, Text} from "react-native";
import {Booking} from "../requests";

class BookingShowScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state={
            bookingStatus: false,
            loading: null,
            errors: []
        }
    }

    componentDidMount() {
        this.mounted = true;
        this.loading = true;
        const { occurenceId } = this.props.occurenceId;
        Booking.create(occurenceId).then(data => {
            console.log(data);
            if (data.errors) {
                this.setState({errors: data.errors});
            } else {
                console.log(data);
                this.setState({bookingStatus: true, loading: false})
            }
        }).catch((error) => console.log(error));
    }

    componentWillUnmount() {
        this.mounted = null;
    }

    render() {
        const {bookingStatus, loading} = this.state;
        return(
            <View>
                {
                    loading || !bookingStatus ? (
                        <Text>Loading...</Text>
                    ) : (
                        <Text style={{fontSize: 15, marginBottom: 10 }} >You class was successfully booked. We are looking forward to seeing you in class.</Text>
                    )
                }
            </View>
        );
    }
};

export default BookingShowScreen;