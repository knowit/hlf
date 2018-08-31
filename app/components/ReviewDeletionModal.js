import {Modal, Platform, StyleSheet, Text, TouchableHighlight, View, Button } from "react-native";
import React from "react";
import {colors} from "../settings/defaultStyles";
import ConfirmButton from "./ConfirmButton";
import CancelButton from "./CancelButton";

export default class ReviewDeletionModal extends Modal {

    _onCancel = () => this.props.onHideModal(false);
    _onConfirm = () => this.props.onHideModal(true);

    render() {
        const { modalVisible, title } = this.props;
        const deletionText = "Vil du slette denne vurderingen?";
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}>
                <View style={ styles.modalOuter }>
                    <View style={ styles.modalInner }>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>
                                { title }
                            </Text>
                        </View>
                        <View style={styles.modalBody}>
                            <Text style={styles.deletionText}>
                                { deletionText }
                            </Text>
                            <View style={styles.buttonGroup}>
                                <CancelButton
                                    title="Avbryt"
                                    onPress={this._onCancel} />
                                <ConfirmButton
                                    title="Slett"
                                    onPress={this._onConfirm} />
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        )
    }

};

const styles = StyleSheet.create({

    modalOuter: {
      marginTop: 22,
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 30,
      width: "100%",
    },

    modalInner: {
        backgroundColor: colors.secondaryBackgroundColor,
    },

    modalHeader: {
        flexDirection: "row",
        justifyContent: "center",
        alignContent: "center",
        margin: 25,
    },

    modalTitle: {
        color: colors.primaryTextColor,
        fontSize: 30,
    },

    modalBody: {
        flexDirection: "column",
        justifyContent: "space-between",
        margin: 25,
    },

    buttonGroup: {
      margin: 25,
      flexDirection: "row",
      justifyContent: "space-between"
    },

    deletionText: {
      color: colors.primaryTextColor,
      fontSize: 20
    },

    closeButton: {
        fontSize: 34,
        justifyContent: "flex-end",
        alignContent: "flex-end",
        fontFamily:
            Platform.OS === "android" ? "sans-serif-light" : undefined,
        color: colors.primaryTextColor,
    }

});