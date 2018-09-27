import {Modal, Platform, StyleSheet, Text, View, TouchableOpacity} from "react-native";
import React from "react";
import {colors} from "../settings/defaultStyles";

export default class ReviewDeletionModal extends Modal {

    _onCancel = () => {
        this.props.onHideModal(false)
    };
    _onConfirm = () => this.props.onHideModal(true);

    render() {
        const { modalVisible, title } = this.props;
        const deletionText = "Vil du slette denne vurderingen?";
        const confirmText = "Slett";
        const cancelText = "Avbryt";

        return (
            <Modal
                animationType="slide"
                transparent={true}
                onRequestClose={() => {
                    this._onCancel();
                }}
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
                                <TouchableOpacity onPress={this._onCancel}>
                                    <View style={styles.button}>
                                        <Text>{cancelText}</Text>
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={this._onConfirm}>
                                    <View style={styles.button}>
                                        <Text>{confirmText}</Text>
                                    </View>
                                </TouchableOpacity>
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
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
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
        fontSize: 20,
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

    button: {
        padding: 8,
        backgroundColor: 'lightblue',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)'
    },

    deletionText: {
      color: colors.primaryTextColor,
      fontSize: 15
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