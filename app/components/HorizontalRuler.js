import React from 'react';
import { View } from 'react-native';
import colors from '../settings/colors';


export default ({ horizontalMargin }) => {
    return (
        <View style={{ borderBottomColor: colors.secondaryTextColor, borderBottomWidth: 1 , marginHorizontal: horizontalMargin}} />
    )
}
