import React, { Component } from 'react';
import { TextInput, StyleSheet, View, Text, TouchableHighlight, FlatList, Image } from 'react-native';
import _ from 'lodash';
import axios from 'axios';

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
                    placeholderTextColor="#A4A4A4"
                    onChangeText={this.onInputChange}
                    selectionColor="white"
                    underlineColorAndroid="rgba(0,0,0,0)"
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
        const key = "AIzaSyA6nH3k6uaWeKf9Y9E_S_tiRhusv1mVXNw";
        const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${this.state.searchPrompt}&key=${key}&region=no`;
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
        backgroundColor: "#31415A",
        height: 40,
        borderRadius: 3,
        marginBottom: 2,
        flexDirection: "row",
        padding: 4,
        overflow: "hidden",
        alignItems: "center",

    },

    icon: {
        color: "#A4A4A4",
        fontSize: 24,
        borderRightWidth: 1,
        borderRightColor: "#A4A4A4",
        paddingHorizontal: 7
    },
    searchInput: {
        marginLeft: 10,
        flex: 1,
        color: "white",
        fontSize: 18
    },
    resultText: {
        color: "white",
        fontSize: 18,
        alignItems: "center",
    }
})