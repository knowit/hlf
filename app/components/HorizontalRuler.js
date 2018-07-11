import React from 'react';
import { View } from 'react-native';
import colors, { COMPONENT_SPACING } from '../settings/defaultStyles';


export default ({  verticalMargin }) => {
    return (
        <View style={{ borderBottomColor: colors.secondaryTextColor, borderBottomWidth: 1 , marginHorizontal: COMPONENT_SPACING * -1, marginVertical: verticalMargin}} />
    )
}

