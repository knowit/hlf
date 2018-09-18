
import {
    Modal,
    StyleSheet,
    Text, TouchableOpacity,
    View,
    Dimensions
} from "react-native";
import React from "react";
import {colors} from "../settings/defaultStyles";
import Auth from "../auth/Auth";

export default class RequestAuthenticationModal2 extends Modal {

    onPress = () => {
      console.log("button pressed");
    };

    constructor(props) {
        super(props);

        this.onConfirm = this.onConfirm.bind(this);
    }

    onConfirm() {
        Auth.login();
    }

    render() {
        const { visible, onModalClose } = this.props;

        const text = "For å utføre ønsket handling kreves det at du er innlogget i appen. Trykk fortsett for å gå videre til innlogging.";
        const cancelText = "Avbryt";
        const confirmText = "Fortsett";
        const { height } = Dimensions.get('window');
        const oneThirdOfScreenHeight = height / 3;

        return (
            <Modal
                animationType="slide"
                transparent={true}
                onRequestClose={onModalClose}
                visible={visible}>
                <View style={[styles.modal, { marginTop: oneThirdOfScreenHeight }]}>
                    <Text style={styles.bodyText}>{text}</Text>
                    <View style={styles.buttonGroup}>
                        <TouchableOpacity onPress={onModalClose}>
                            <View style={styles.button}>
                                <Text>{cancelText}</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.onConfirm}>
                            <View style={styles.button}>
                                <Text>{confirmText}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        )
    }

};

const styles = StyleSheet.create({

    modal: {
      backgroundColor: colors.secondaryBackgroundColor,
      padding: 22,
      borderRadius: 10,
      borderColor: 'rgba(0, 0, 0, 0.1)',
      alignSelf: 'center',
      width: '75%',
      maxWidth: '75%',
    },

    button: {
        padding: 8,
        backgroundColor: 'lightblue',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)'
    },

    buttonGroup: {
      padding: 12,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },

    bodyText: {
      padding: 12,
      justifyContent: 'center',
      alignItems: 'center',
      color: colors.primaryTextColor,
      fontSize: 15,
    },





});