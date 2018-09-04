import React from 'react';

import {
    Button,
    StyleSheet,
} from 'react-native';

export default class ConfirmButton extends React.Component {

    render() {
        const { title, onPress } = this.props;
        return (
            <Button title={title} onPress={onPress} style={styles.btn} />
        );
    }
}

const styles = StyleSheet.create({
    btn: {
        //backgroundColor: "transparent",
        borderWidth: 2,
        borderStyle: "solid",
        borderRadius: 6,
    }
});