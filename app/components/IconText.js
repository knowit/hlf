import React from 'react';
import { View, StyleSheet} from 'react-native';
import { MaterialIcons, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import colors from '../settings/defaultStyles';
import AppText from './AppText';


const IconText =  ({ text, iconSettings, reversedOrder, size, iconColor}) => {
    const {iconLibrary, iconName} = iconSettings;
    const IconComponent = iconLibraries[iconLibrary];
    const iconTextSize = size ? size: 20

    const textMarginWidth = 7;
    const textMargin = !reversedOrder ? {marginLeft: textMarginWidth} : {marginRight: textMarginWidth};

    return (
        <View style={{flexDirection: !reversedOrder ? "row" : "row-reverse", alignItems: "center"}}>
            <IconComponent name={iconName} color={iconColor ? iconColor : colors.primaryTextColor} size={iconTextSize}/>
            <AppText type="header" style={[textMargin, {fontSize: iconTextSize}]}>{text}</AppText>
        </View>
    )
}


const iconLibraries = {
    materialIcons: MaterialIcons,
    materialCommunityIcons: MaterialCommunityIcons
}

IconText.propTypes= {
    text: PropTypes.string.isRequired,
    iconSettings: PropTypes.object.isRequired,
    reversedOrder: PropTypes.bool,
    size: PropTypes.number,
    iconColor: PropTypes.string
}

export default IconText;



