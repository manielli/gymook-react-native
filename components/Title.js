import React from "react";
import { Text } from "react-native";

const Title = props => (
    <Text style={{ 
        fontSize: 40, 
        color: "maroon", 
        fontWeight: "bold",
        }}
    >
        {props.children}
    </Text>
)

export default Title;