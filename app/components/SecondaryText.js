import React from 'react';
import { Text } from 'react-native';
import colors from '../settings/colors';

export default ({ style, children }) => {
    return (
        <Text style={[{color: colors.secondaryTextColor, fontSize: 15},style]}>{children}</Text>
    )

}