import {Modal, Platform, StyleSheet, Text, TouchableHighlight, View} from "react-native";
import PropertyTitle from "./PropertyTitle";
import SlimText from "./SlimText";
import React from "react";
import {colors} from "../settings/defaultStyles";
import { connect } from 'react-redux';
import { onClosePropertyInformationModal } from '../actions/propertiesModal';

class PropertyInformationModal extends Modal {

    constructor(props) {
        super(props);
    }

    render() {
        const { modalVisible, currentProperty, onClosePropertyInformationModal } = this.props;

        return (
            <Modal
                animationType="slide"
                transparent={false}
                style={{ flex: 1}}
                onRequestClose={() => {
                    onClosePropertyInformationModal()
                }}
                visible={modalVisible}>
                <View style={{ marginTop: 0 }}>
                    <View style={ styles.modal }>
                        <View style={styles.modalHeader}>
                            <PropertyTitle
                                property={currentProperty}
                                size={25}
                            />
                            <TouchableHighlight
                                onPress={() => {
                                    onClosePropertyInformationModal()
                                }}>
                                <Text style={styles.closeButton}>X</Text>
                            </TouchableHighlight>
                        </View>
                        <SlimText style={ styles.modalBody }>{ currentProperty.longDescription }</SlimText>
                    </View>
                </View>
            </Modal>
        )
    }

};

const styles = StyleSheet.create({
    modal: {
        backgroundColor: colors.secondaryBackgroundColor,
        alignItems: "stretch",
        //borderRadius: 20,
        overflow: "hidden",
        height: "100%",
    },

    modalHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        margin: 25,
        marginTop: 50,

    },

    modalBody: {
        margin: 25,
        fontSize: 20
    },

    closeButton: {
        fontSize: 25,
        justifyContent: "flex-end",
        alignContent: "flex-end",
        fontFamily:
            Platform.OS === "android" ? "sans-serif-light" : undefined,
        color: colors.primaryTextColor,
    }

});

export default connect(
    ({ propertiesInformation }) => ({ ...propertiesInformation }),
    { onClosePropertyInformationModal }
)(PropertyInformationModal);