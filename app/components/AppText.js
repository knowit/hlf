import React from 'react';
import {Text, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import colors, {sizes} from '../settings/defaultStyles';


const TextNode = ({type, size, children, style}) => {
    
    let output = "";

    if(typeof(children) === "string") {
        output = children;
    }
else {
    const iconSize = StyleSheet.flatten(styles[size]).fontSize;
    output = React.Children.map(children, child => {
        if(child.type && child.type.name === "Icon") {
            return React.cloneElement(child, {size: iconSize})
        }
        return child;
    })
}

    return (
        <Text style={[styles[size], styles[type], style]}>{output}</Text>
    ) 
}
export default TextNode;

const styles = StyleSheet.create({

    inverse: {
        color: colors.primaryBackgroundColor, 
    },
    primary: {
        color: colors.primaryTextColor,
    },
    secondary: {
        color: colors.secondaryTextColor,
    },
    positive: {
        color: colors.positiveColor
    },
    negative: {
        color: colors.negativeColor
    },
    xlarge: {  
        fontSize: sizes.xlarge
    },
    large: {
        fontSize: sizes.large
    },
    medium: {
        fontSize: sizes.medium
    },
    small: {
        fontSize: sizes.small
    }

})

TextNode.propTypes = {
    type: PropTypes.oneOf(["inverse", "primary", "secondary", "positive", "negative"]).isRequired,
    size: PropTypes.oneOf(["xlarge", "large", "medium", "small"]),
    style: PropTypes.oneOfType([PropTypes.array, PropTypes.object]), // Todo, sjekk om det er overlapp ref toggle comments på review
}