import React from "react";
import { Text } from "react-native";

const Title = props => (
    <Text style={{
        marginTop: 50, 
        fontSize: 40, 
        color: "steelblue", 
        fontWeight: "bold"
    }}>
        {props.children}
    </Text>
)

export default Title;