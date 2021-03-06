import React, {Component} from "react";
import {
    TextInput,
    Text,
    StyleSheet,
    View,
    TouchableHighlight,
    TouchableOpacity,
    Platform
} from "react-native";
import _ from "lodash";
import axios from "axios";
import colors, {
    COMPONENT_SPACING,
    BORDER_RADIUS,
} from "../settings/defaultStyles";
import {API_KEY} from "../settings/credentials";
import Entypo from "react-native-vector-icons/Entypo";
import ViewContainer from "../components/ViewContainer";
import SlimText from "../components/SlimText";

export default class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchInputStatus: 'untouched',
            searchPrompt: "",
            results: [],
        };

        this.onInputChange = this.onInputChange.bind(this);
        this.clearText = this.clearText.bind(this);

        this.handleSeach = _.debounce(this.handleSearch, 1000);
    }

    render() {
        return (
            <ViewContainer transparent={true}>
                {this.renderMenuBar()}
                {this.state.searchPrompt && this.state.results.length > 0
                    ? this.state.results
                        .slice(0, 4)
                        .map(item => this.renderSearchResult(item))
                    : null}
            </ViewContainer>
        );
    }

    renderMenuBar() {
        return (
            <View style={styles.row}>
                <TouchableHighlight
                    onPress={this.props.onMenuPress}
                    style={styles.iconWrap}
                >
                    <Text style={styles.icon}>☰</Text>
                </TouchableHighlight>
                <TextInput
                    ref={input => (this.input = input)}
                    value={this.state.searchPrompt}
                    style={styles.searchInput}
                    placeholder="Søk..."
                    placeholderTextColor={colors.secondaryTextColor}
                    onChangeText={this.onInputChange}
                    selectionColor={colors.primaryTextColor}
                    underlineColorAndroid={colors.transparentColor}
                    onFocus={() => this.props.deselectVenue()}
                />
                {this.renderClearButton()}
            </View>
        );
    }

    renderSearchResult(item) {
        return (
            <TouchableHighlight
                key={item.place_id}
                onPress={() => {
                    const { onVenueSelect } = this.props;
                    onVenueSelect(item.place_id);
                    this.clearText();
                    this.input.blur();
                    this.setState({searchPrompt: ""});
                }}
            >
                <View style={styles.row}>
                    <View style={styles.iconWrap}>
                        <SlimText>
                            <Entypo name="location-pin" color="white" size={24}/>
                        </SlimText>
                    </View>
                    <SlimText style={styles.resultText} numberOfLines={2}>
                        {item.description}
                    </SlimText>
                </View>
            </TouchableHighlight>
        );
    }

    renderClearButton() {
        if(this.state.searchInputStatus == 'touched') {
            return (
              <TouchableOpacity onPress={this.clearText}>
                  <SlimText style={styles.clearButton}>X</SlimText>
              </TouchableOpacity>
            );
        }
    }

    onInputChange(prompt) {
        this.setState({
            searchInputStatus: 'touched',
            searchPrompt: prompt,
        });

        this.handleSearch();
    }

    clearText() {
        this.setState({
            searchInputStatus: 'untouched',
            searchPrompt: '',
            results: [],
        });
    }

    handleSearch() {
        const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${
            this.state.searchPrompt
            }&key=${API_KEY}&region=no&types=establishment`;

        axios
            .get(url)
            .then(({data}) =>
                this.setState({
                    results: data.predictions.map(item => {
                        item.key = item.place_id;
                        return item;
                    })
                })
            )
            .catch(req => req);
    }
}

const styles = StyleSheet.create({
    row: {
        backgroundColor: colors.primaryBackgroundColor,
        height: 60,
        borderRadius: BORDER_RADIUS,
        marginBottom: 2,
        flexDirection: "row",
        overflow: "hidden",
        alignItems: "center"
    },

    iconWrap: {
        width: 60,
        top: 0,
        position: "absolute",
        bottom: 0,
        justifyContent: "center",
        alignItems: "center",
        borderRightWidth: 1,
        borderRightColor: colors.divider
    },

    icon: {
        fontSize: 24,
        color: "white"
    },

    searchInput: {
        marginLeft: COMPONENT_SPACING / 3 + 60,
        marginRight: COMPONENT_SPACING,
        flex: 1,
        color: colors.primaryTextColor,
        fontSize: 18,
        fontFamily: Platform.OS === "android" ? "sans-serif-light" : undefined
    },

    resultText: {
        color: colors.primaryTextColor,
        fontSize: 18,
        maxHeight: 60,
        marginLeft: COMPONENT_SPACING / 3 + 60
    },

    clearButton: {
        marginRight: COMPONENT_SPACING,
        color: colors.primaryTextColor,
        fontSize: 24,
        fontWeight: "bold",
        fontFamily: Platform.OS === "android" ? "sans-serif-light" : undefined
    }
});
