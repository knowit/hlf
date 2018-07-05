import React, { Component } from 'react';
import { TextInput, StyleSheet, View, Text, TouchableHighlight} from 'react-native';
import _ from 'lodash';
import axios from 'axios';
import colors from '../settings/colors';
import {API_KEY} from '../credentials';

export default class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = { searchPrompt: "", results: [] }

        this.onInputChange = this.onInputChange.bind(this);
        this.handleSeach = _.debounce(this.handleSeach, 1000);


    }

    render() {

        return (
            <View style={styles.wrap}>
                {this.renderMenuBar()}
                {this.state.searchPrompt && this.state.results.length > 0
                    ? this.state.results.map(item => this.renderSearchResult(item))
                    : null
                }
            </View>
        )
    }

    renderMenuBar() {
        return (
            <View style={styles.row}>
                <TouchableHighlight style={styles.iconWrap} onPress={this.props.onMenuPress}>
                    <Text style={styles.icon}>☰</Text>
                </TouchableHighlight>
                <TextInput
                    value={this.state.searchPrompt}
                    style={styles.searchInput}
                    placeholder="Søk..."
                    placeholderTextColor={colors.secondaryTextColor}
                    onChangeText={this.onInputChange}
                    selectionColor={colors.primaryTextColor}
                    underlineColorAndroid={colors.transparentColor}
                />
            </View>
        )
    }

    renderSearchResult(item) {

        return (
            <TouchableHighlight key={item.place_id} onPress={() => this.props.onVenueSelect(item)} >
                <View style={styles.row}>
                    <Text style={styles.resultText} numberOfLines={1}>{item.description}</Text>
                </View>
            </TouchableHighlight>
        )
    }

    onInputChange(prompt) {
        this.setState({ searchPrompt: prompt })
        this.handleSeach();
    }

    handleSeach() {
        const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${this.state.searchPrompt}&key=${API_KEY}&region=no`;
        const request = axios.get(url)
            .then(({ data }) => this.setState({
                results: data.predictions.map(item => {
                    item.key = item.place_id
                    return item
                })
            }))
            .catch(req => console.log(req));

    }


}

const styles = StyleSheet.create({
    wrap: {
        width: "100%",
        height: "auto",
        display: "flex",
        padding: 20,
        flexDirection: "column",
    },
    row: {
        backgroundColor: colors.primaryBackgroundColor,
        height: 40,
        borderRadius: 3,
        marginBottom: 2,
        flexDirection: "row",
        padding: 4,
        overflow: "hidden",
        alignItems: "center",

    },

    icon: {
        color: colors.secondaryTextColor,
        fontSize: 24,
        borderRightWidth: 1,
        borderRightColor: colors.secondaryTextColor,
        paddingHorizontal: 7
    },
    searchInput: {
        marginLeft: 10,
        flex: 1,
        color: colors.primaryTextColor,
        fontSize: 18
    },
    resultText: {
        color: colors.primaryTextColor,
        fontSize: 18,
        alignItems: "center",
    }
})