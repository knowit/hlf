import React from "react";
import { Modal, View, StyleSheet } from "react-native";
import ViewContainer from "./ViewContainer";

export default ({ title, text, onClose }) => {
  return (
    <Modal
      style={{ margin: 40 }}
      visible={false}
      transparent
      onRequestClose={() => console.log("close")}
    >
      <View style={styles.innerModal} />
    </Modal>
  );
};

const styles = StyleSheet.create({});
