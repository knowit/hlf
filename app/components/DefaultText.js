import React from 'react';
import {Text} from 'react-native';


export default (props) => {
    
    return <Text style={[props.style,{color:"#FFFFFF"}]}>{props.children}</Text>
}

