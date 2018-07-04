import React from 'react';
import { Text, StyleSheet } from 'react-native';
import colors from '../settings/defaultStyles';
export default ({ children }) => {
    return (
        <Text style={{ color: colors.primaryTextColor, fontSize: 20 }}>{children}</Text>
    )
}
