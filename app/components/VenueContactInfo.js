import React from 'react';
import {View, StyleSheet} from 'react-native';
import AppText from './AppText';
import {COMPONENT_SPACING} from '../settings/defaultStyles';
import HorizontalRuler from './HorizontalRuler';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';


export default ({selectedVenue}) => {

    return (
        <View style={styles.container}>
            <AppText type="primary" size="large">{selectedVenue.name}</AppText>
            {selectedVenue.formatted_address ? <AppText type="secondary" size="small">{selectedVenue.formatted_address}</AppText> : null}
            {selectedVenue.formatted_phone_number ? <AppText type="primary" size="medium"><MaterialCommunityIcons name="phone"/>{selectedVenue.formatted_phone_number}</AppText> : null}
            <HorizontalRuler verticalMargin={20} horizontalMargin={COMPONENT_SPACING * -1}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: COMPONENT_SPACING,
        paddingHorizontal: COMPONENT_SPACING
    }
})