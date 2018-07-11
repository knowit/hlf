import React from 'react'
import { TouchableHighlight, StyleSheet } from 'react-native';
import AppText from './AppText';
import colors, {BORDER_RADIUS, COMPONENT_SPACING} from '../settings/defaultStyles';

export default ({ children, onPress, id, value }) => {
    const color = value === undefined ? "primary" : value !== id ? "secondary" : id === 1 ? "positive" : "negative";
    return (
        <TouchableHighlight onPress={onPress} style={[styles.default, styles[color] ? styles[color] : null]} >
            <AppText type={color} size="xlarge">
                {children}
            </AppText>
        </TouchableHighlight>

    )
}

const styles = StyleSheet.create({
    positive: {
        borderColor: colors.positiveColor
    },
    negative: {
        borderColor: colors.negativeColor
    },
    default: {
        borderRadius: BORDER_RADIUS,
        borderWidth: 1,
        borderColor: colors.transparentColor,
        paddingHorizontal: COMPONENT_SPACING,
        paddingVertical: COMPONENT_SPACING / 3,
    },    
})