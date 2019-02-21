import React, {Component} from "react";
import {Button,Modal,ScrollView,View,TouchableOpacity,Text} from "react-native";
import OccurenceShowScreen from "./OccurenceShowScreen";
import { Occurence} from "../requests";
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

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

class OccurenceIndexScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            occurences: [],
            isModalVisible: false,
            occurenceId: null
        }
    }



    componentDidMount() {
        Occurence.all().then(occurences => {
            this.setState({
                occurences: occurences,
                formattedOccurences: formatOccurences(occurences)
            });
        }).catch((error) => {console.log(error)});
        
    }

    render() {
        const {occurenceId, isModalVisible, occurences, formattedOccurences} = this.state;
        return(
            <ScrollView style={{width: "100%"}} >
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
                
                {/* <CalendarList 
                    style={{marginTop: 50, borderRadius: 20}} 
                    minDate={Date()}
                    pastScrollRange={1}
                    futureScrollRange={1}
                    showScrollIndicator={true}
                    horizontal={true}
                    theme={{
                        backgroundColor: 'whitesmoke',
                        calendarBackground: 'whitesmoke',
                        monthTextColor: 'steelblue'
                      }}

                    onDayPress={(day) => {console.log('selected day', day)}}
                    onMonthChange={(month) => {console.log('month changed', month)}}
                    markedDates={{
                        '2019-02-26': {selected: true, marked: true, selectedColor: 'blue'},
                        '2019-02-27': {marked: true},
                        '2019-02-28': {marked: true, dotColor: 'red', activeOpacity: 0},
                        '2019-02-29': {disabled: true, disableTouchEvent: true}
                    }}

                /> */}
                <Agenda
                    style={{borderRadius: 20, marginTop: 50, height: 800}} 
                    
                    minDate={Date()}
                    
                    pastScrollRange={1}
                    
                    futureScrollRange={1}
                    
                    selected={Date()}
                    
                    theme={{
                        backgroundColor: 'whitesmoke',
                        calendarBackground: 'whitesmoke',
                        monthTextColor: 'steelblue'
                    }}
                                        
                    items={
                        formattedOccurences
                    }
                    
                    renderItem={(item, firstItemInDay) => (item ? ( 
                        <View style={{borderWidth: 1, borderColor: "steelblue", borderLeftWidth: 0, borderRightWidth: 0 }} >
                            <OccurenceShowScreen occurenceId={item.id} />  
                        </View> 
                        ) : null )
                    }
                    
                    renderDay={(day, item) => (
                        <View style={{margin: 20}} >
                            { day ? <Text>{day.day}</Text> : null }
                        </View> 
                    )}
                    
                    renderEmptyDate={() => {return (<View />);}}
                    
                    renderEmptyData = {() => {return (<View />);}}
                    
                    onRefresh={() => console.log('refreshing...')}
                    
                    rowHasChanged={(r1, r2) => {return r1.text !== r2.text}}
                />

            </ScrollView>
        );
    }

};

export default OccurenceIndexScreen;