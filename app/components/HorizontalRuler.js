import React from 'react';
import { View } from 'react-native';
import colors from '../settings/defaultStyles';


export default ({ horizontalMargin, verticalMargin }) => {
    return (
        <View style={{ borderBottomColor: colors.secondaryTextColor, borderBottomWidth: 1 , marginHorizontal: horizontalMargin, marginVertical: verticalMargin}} />
    )
}

