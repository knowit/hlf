
import {
    Modal,
    Platform,
    StyleSheet,
    Text, TouchableHighlight,
    View,
} from "react-native";
import React from "react";
import {colors} from "../settings/defaultStyles";
import ConfirmButton from "./ConfirmButton";
import CancelButton from "./CancelButton";
import Auth from "../auth/Auth";

export default class RequestAuthenticationModal extends Modal {

    constructor(props) {
        super(props);

        this.onConfirm = this.onConfirm.bind(this);
    }

    onConfirm() {
        const {onModalClose} = this.props;
        onModalClose();
        Auth.login();
    }

    render() {
        const { visible, onModalClose } = this.props;

        const title = "Innlogging";
        const text = "For å utføre ønsket handling kreves det at du er innlogget i appen. Trykk fortsett for å logge inn eller for å opprette en ny brukerkonto.";
        const cancelText = "Avbryt";
        const confirmText = "Fortsett";

        return (
            <Modal
                animationType="slide"
                transparent={false}
                style={{ flex: 1}}
                onRequestClose={onModalClose}
                visible={visible}>
                <View style={ styles.modalInner }>
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalTitle}>
                            { title }
                        </Text>
                        <TouchableHighlight
                            onPress={onModalClose}>
                            <Text style={styles.closeButton}>X</Text>
                        </TouchableHighlight>
                    </View>
                    <View style={styles.modalBody}>
                        <Text style={styles.bodyText}>
                            { text }
                        </Text>
                        <View style={styles.buttonGroup}>
                            <CancelButton
                                title={cancelText}
                                onPress={onModalClose} />
                            <ConfirmButton
                                title={confirmText}
                                onPress={this.onConfirm} />
                        </View>
                    </View>
                </View>
            </Modal>
        )
    }

};

const styles = StyleSheet.create({

    modalInner: {
        flex: 1,
        backgroundColor: colors.secondaryBackgroundColor,
    },

    modalHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        margin: 25,
        padding: 20,
    },

    modalTitle: {
        color: colors.primaryTextColor,
        fontSize: 30,
    },

    modalBody: {
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 20
    },

    buttonGroup: {
      marginBottom: 25,
      padding: 80,
      flexDirection: "row",
      justifyContent: "space-between"
    },

    bodyText: {
      color: colors.primaryTextColor,
      fontSize: 20
    },

    closeButton: {
        fontSize: 30,
        justifyContent: "flex-end",
        alignContent: "flex-end",
        fontFamily:
            Platform.OS === "android" ? "sans-serif-light" : undefined,
        color: colors.primaryTextColor,
    }

});