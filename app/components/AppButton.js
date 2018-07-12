import React from 'react'
import { TouchableHighlight, StyleSheet } from 'react-native';
import AppText from './AppText';
import PropTypes from 'prop-types';
import {BORDER_RADIUS, colors, COMPONENT_SPACING} from '../settings/defaultStyles';


export const AppButton = ({ onPress, children, inverse}) => {

    return (
        <TouchableHighlight style={[styles.button, !inverse ? styles.primary : styles.inverse]} onPress={onPress}>
            <AppText type={!inverse ? "inverse" : "primary"} size="large">{children}</AppText>
        </TouchableHighlight>
    )
}


const styles = StyleSheet.create({
    button: {
        marginVertical: 5,
        borderRadius: BORDER_RADIUS,
        paddingVertical: COMPONENT_SPACING,
        alignItems: "center",
        justifyContent: "center"

    },
    primary: {
        backgroundColor: colors.primaryTextColor,
    },
    inverse: {
        backgroundColor: colors.secondaryBackgroundColor
    }
});

AppButton.propTypes = {
    onPress: PropTypes.func,
    inverse: PropTypes.bool

}

export default AppButton;