import React from 'react';
import { View, StyleSheet} from 'react-native';
import DefaultText from './DefaultText';
import { MaterialIcons, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import PropTypes from 'prop-types';

const IconText =  ({ name, alignment}) => {
    const IconComponent = iconLibraries["materialIcons"];

    return (
        <View style={{ flex: 1, flexDirection: "row", alignItems: "center", justifyContent: `${alignment ? alignment : "flex-start"}`}}>
            <IconComponent name="hearing" size={20} color="white"/>
            <DefaultText style={{fontSize:18}}>{name}</DefaultText>
        </View>
    )
}

const iconLibraries = {
    materialIcons: MaterialIcons,
}

/*IconText.propTypes= {
    text: PropTypes.string.isRequired,
    textStyles: PropTypes.object,
    iconLibrary: PropTypes.string.isRequired,
    iconName: PropTypes.string.isRequired,
    iconStyles: PropTypes.object,
    reversedOrder: PropTypes.bool
}*/

export default IconText;



