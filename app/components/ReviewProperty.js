import React, { Component } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableHighlight,
  Platform
} from "react-native";
import SlimText from "./SlimText";
import PropTypes from "prop-types";
import { colors, COMPONENT_SPACING } from "../settings/defaultStyles";
import PropertyTitle from "./PropertyTitle";
import ReviewOptionButton from "./ReviewOptionButton";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

class ReviewProperty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newComment: "",
      submittedComment: "",
      commentEdited: false
    };
    this.onReviewSubmit = this.onReviewSubmit.bind(this);
  }

  componentDidMount() {
    const { comment } = this.props.currentProperty;
    if (comment && comment.length > 0) {
      this.setState({ newComment: comment });
    }
  }

  componentDidUpdate(previousProps) {
    const { comment } = this.props.currentProperty;
    const propertyChanged =
      previousProps.currentProperty.name !== this.props.currentProperty.name;
    if (!propertyChanged) return;
    if (comment && comment.length > 0 && this.state.newComment !== comment) {
      this.setState({ newComment: comment });
    } else {
      this.setState({ newComment: "" });
    }
  }

  render() {
    const commentSubmitted =
      this.props.currentProperty.comment === this.state.submittedComment &&
      this.state.submittedComment === this.state.newComment &&
      this.state.newComment;
    const { currentProperty } = this.props;
    const { value } = currentProperty;
    return (
      <View style={styles.container}>
        <View style={styles.upper}>
          <PropertyTitle
            property={currentProperty}
            size={25}
            style={{ justifyContent: "center" }}
          />
          <SlimText style={styles.desc}>{currentProperty.description}</SlimText>
          <View style={styles.buttonRow}>
            <ReviewOptionButton
              buttonValue={false}
              selectedValue={value}
              onOptionSelected={this.onReviewSubmit}
            />
            <MaterialIcons
              name="info-outline"
              size={30}
              color={colors.primaryTextColor}
              style={styles.infoIcon}
            />
            <ReviewOptionButton
              buttonValue={true}
              selectedValue={value}
              onOptionSelected={this.onReviewSubmit}
            />
          </View>
        </View>
        <View style={styles.lower}>
          <TextInput
            placeholder="Skriv en kommentar..."
            style={styles.commentInput}
            underlineColorAndroid={colors.transparentColor}
            placeholderTextColor={colors.secondaryTextColor}
            multiline={true}
            numberOfLines={3}
            value={this.state.newComment}
            onChangeText={text =>
              this.setState({ commentEdited: true, newComment: text })
            }
          />
          <TouchableHighlight onPress={() => this.onReviewSubmit("comment")}>
            <MaterialIcons
              name={commentSubmitted ? "done" : "chevron-right"}
              color={
                commentSubmitted
                  ? colors.positiveColor
                  : colors.secondaryTextColor
              }
              size={55}
            />
          </TouchableHighlight>
        </View>
      </View>
    );
  }

  onReviewSubmit(source, newValue) {
    const { commentEdited, newComment } = this.state;
    const comment = commentEdited
      ? newComment
      : this.props.currentProperty.comment;
    const value =
      source === "value" ? newValue : this.props.currentProperty.value;
    const body = {
      kommentar: comment,
      rangering: value === undefined ? null : value
    };
    if (commentEdited)
      this.setState({ commentEdited: false, submittedComment: comment });
    this.props.onReviewSubmit(body);
  }

  setPreviousCommentToInput() {
    const { comment } = this.props.currentProperty;
    if (comment && comment.length > 0) this.setState({ newComment: comment });
  }
}

ReviewProperty.propTypes = {
  currentProperty: PropTypes.object.isRequired,
  onReviewSubmit: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.secondaryBackgroundColor,
    alignItems: "stretch",
    borderRadius: 20,
    overflow: "hidden",
    flex: 1
  },
  upper: {
    padding: COMPONENT_SPACING
  },
  desc: {
    marginVertical: COMPONENT_SPACING,
    fontSize: 20,
    textAlign: "center"
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  infoIcon: {
    marginHorizontal: 40
  },
  lower: {
    flexDirection: "row",
    backgroundColor: colors.tertiaryBackgroundColor
  },
  commentInput: {
    fontSize: 20,
    flex: 1,
    padding: 10,
    color: colors.primaryTextColor,
    textAlignVertical: "top",
    fontFamily: Platform.OS === "android" ? "sans-serif-light" : undefined
  },
  commentButton: {}
});
export default ReviewProperty;
