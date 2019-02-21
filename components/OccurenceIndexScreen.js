import React, {Component} from "react";
import {StyleSheet,Button,Modal,ScrollView,View,TouchableOpacity,Text} from "react-native";
import OccurenceShowScreen from "./OccurenceShowScreen";
import { Occurence, GymClass} from "../requests";
import { Agenda } from 'react-native-calendars';
import Title from "./Title";
import BookingShowScreen from "./BookingShowScreen";


class OccurenceIndexScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            occurences: [],
            isModalVisible: false,
            occurenceId: null,
            loading: null,
            gymClasses: [],
            bookingModalVisible: false,
        }
    }
    
    
    
    componentDidMount() {
        this.setState({mounted: true, loading: true});
        Occurence.all().then(occurences => {
            this.setState({
                occurences: occurences,
                formattedOccurences: formatOccurences(occurences),
                loading: false
            });
        }).catch((error) => {console.log(error)});
        GymClass.all().then(gym_classes => {
                this.setState({
                    gymClasses: gym_classes
                })
            }
        ).catch((error) => console.log(error));
    }

    componentWillUnmount() {
        this.mounted = null;
    }
    
    render() {
        const {occurenceId, isModalVisible, occurences, formattedOccurences, loading, bookingModalVisible} = this.state;
        return (
            <ScrollView style={{padding: 10, width: "100%"}} >
                {
                    loading ? (
                        <Title>Loading...</Title>
                        ) : (
                            <>
                            <Modal animationType="fade" transparent visible={isModalVisible} >
                                <View style={{
                                    flex: 1,
                                    backgroundColor: "rgba(0,0,0,0.1)",
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
                                        borderRadius: 15
                                    }} >
                                        <OccurenceShowScreen occurenceId={occurenceId} />
                                        <Button onPress={() => this.setState({isModalVisible: false}) } title="Close" />
                                        <Button onPress={() => this.setState({bookingModalVisible: true})} title="Book" />
                                    </View>
                                </View>
                            </Modal>
                            <Modal animationType="fade" transparent visible={bookingModalVisible} >
                                    <View style={{
                                        flex: 1,
                                        backgroundColor: "rgba(0,0,0,0.1)",
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
                                            borderRadius: 15
                                        }} >
                                            <BookingShowScreen occurenceId={occurenceId} />
                                            <Button onPress={() => this.setState({bookingModalVisible: false}) } title="Close" />
                                        </View>
                                    </View>
                            </Modal>
                            <Agenda
                                style={{borderRadius: 20, marginTop: 50, height: 600, backgroundColor: "whitesmoke"}} 
                                
                                minDate={Date()}
                                
                                pastScrollRange={1}
                                
                                futureScrollRange={1}
                                
                                selected={Date()}
                                
                                theme={{
                                    backgroundColor: 'whitesmoke',
                                    calendarBackground: 'whitesmoke',
                                    monthTextColor: 'steelblue'
                                }}
                                
                                items={formattedOccurences}
                                
                                renderItem={this.renderItem.bind(this)}
                                renderDay={this.renderDay.bind(this)}
                                renderEmptyDate={this.renderEmptyDate.bind(this)}
                                rowHasChanged={this.rowHasChanged.bind(this)}                    
                            />
                        </>
                    )
                }
            </ScrollView>
        );
    }
    
    renderItem(item) { 
        return(
            <TouchableOpacity onPress={() => this.setState({isModalVisible: true, occurenceId: item.id})} >
                <View style={[styles.item, {height: item.height}]} >
                    <OccurenceShowScreen occurenceId={item.id} />  
                </View> 
            </TouchableOpacity>
        )
    }

    renderDay(day) {
        return( day ? (
            <TouchableOpacity>
                <View style={{margin: 20, borderRadius: "35px", backgroundColor: "lightblue"}} >    
                    <Text style={{padding: 15, color: "white"}} >{day.day}</Text>
                </View>
            </TouchableOpacity>
            ) : null
            )
        }
        
    renderEmptyDate() {
        return (
            <View style={styles.emptyDate}><Text>This is empty date!</Text></View>
        );
    }
    
    rowHasChanged(r1, r2) {
        return r1.name !== r2.name;
    }
    
    timeToString(time) {
        const date = new Date(time);
        return date.toISOString().split('T')[0];
    }
    
};

const formatDate = (dateString) => dateString.split("T")[0]

const formatOccurences = (occurences) => {
    const outputObj = {};

    occurences.forEach((occurence) => {
        const startTime = formatDate(occurence.start_time)
        if (outputObj[startTime]) {
            outputObj[startTime].push(occurence)
        } else {
            outputObj[startTime] = [occurence]
        }
    })

    return outputObj;
} 

const styles = StyleSheet.create({
    item: {
        backgroundColor: 'white',
        flex: 1,
        borderRadius: 10,
        padding: 10,
        marginRight: 10,
        marginTop: 17
    },
    emptyDate: {
        height: 15,
      flex:1,
      paddingTop: 30
    }
});

export default OccurenceIndexScreen;