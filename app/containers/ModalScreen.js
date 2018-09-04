import React, { Component } from 'react';
import {Modal, Platform, StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import properties from "../settings/propertyConfig";
import SlimText from "../components/SlimText";
import PropTypes from "prop-types";
import {colors } from "../settings/defaultStyles";
import PropertyTitle from "../components/PropertyTitle";
import PropertyInformationModal from '../components/PropertyInformationModal';
import { connect } from 'react-redux';
import {onOpenPropertyInformationModal } from "../actions/propertiesModal";

class ModalScreen extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
          <View style={{ marginTop: 22 }}>
              <PropertyInformationModal />
              {properties.map((property, index) => {
                  return (
                      <TouchableHighlight
                          key={index}
                          onPress={() => {
                              this.props.onOpenPropertyInformationModal(property)
                          }}>
                          <Text>{ property.name }</Text>
                      </TouchableHighlight>
                  );
              })}

          </View>
        );
    }
};

export default connect(
    ({ propertyInformationModal }) => ({ ...propertyInformationModal }),
    { onOpenPropertyInformationModal }
)(ModalScreen);