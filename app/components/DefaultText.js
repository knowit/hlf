import React from 'react';
import {Text} from 'react-native';
import colors from '../settings/defaultStyles';


export default ({style, children}) => {
    
    return <Text style={[style,{color: colors.primaryTextColor}]}>{children}</Text>
}

