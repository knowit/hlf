import React from 'react'
import { Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import colors from '../settings/defaultStyles'

const AppText = ({ type, children }) => {
    console.log(React.Children.forEach(children, element => console.log(element)))
    return (
        <Text style={styles[type]}>{children}</Text>
    )
}

const styles = StyleSheet.create({
    header: {
        color: colors.primaryTextColor,
        fontSize: 40
    },
    primary: {
        color: colors.primaryTextColor
    },
    secondary: {
        color: colors.secondaryTextColor,
        fontSize: 15
    },
    iconWrap: {
        flexDirection: "row"
    }
})

AppText.propTypes = {
    type: PropTypes.oneOf(["header", "primary", "secondary"]).isRequired,
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
}

export default AppText;