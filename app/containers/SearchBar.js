import React, { Component } from 'react';
import { TextInput, StyleSheet, View, Text, TouchableHighlight } from 'react-native';
import _ from 'lodash';
import axios from 'axios';
import colors, { COMPONENT_SPACING, BORDER_RADIUS } from '../settings/defaultStyles';
import { API_KEY } from '../credentials';
import AppText from '../components/AppText';
import Entypo from '@expo/vector-icons/Entypo';
import ViewContainer from '../components/ViewContainer';


export default class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = { searchPrompt: "", results: [] }

        this.onInputChange = this.onInputChange.bind(this);
        this.handleSeach = _.debounce(this.handleSearch, 1000);
    }

    render() {
        return (
            <ViewContainer heightAdjusting="auto" transparent={true}>
                {this.renderMenuBar()}
                {this.state.searchPrompt && this.state.results.length > 0
                    ? this.state.results.map(item => this.renderSearchResult(item))
                    : null
                }
            </ViewContainer>
        )
    }

    renderMenuBar() {
        return (
            <View style={styles.row}>
                <TouchableHighlight onPress={this.props.onMenuPress}>
                    <AppText type="secondary" size="xlarge" style={StyleSheet.flatten(styles.icon)}>☰</AppText>
                </TouchableHighlight>
                <TextInput
                    ref={input => this.input = input}
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
            <TouchableHighlight key={item.place_id} onPress={() => {
                this.props.onVenueSelect(item.place_id)
                this.input.blur();
                this.setState({searchPrompt: ""})
                }}>
                <View style={styles.row}>
                    <AppText type="primary" size="medium"><Entypo name="location-pin" /> {item.description}</AppText>
                </View>
            </TouchableHighlight>
        )
    }

    onInputChange(prompt) {
        this.setState({ searchPrompt: prompt })

        this.handleSearch();
    }

    handleSearch() {

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
    row: {
        backgroundColor: colors.primaryBackgroundColor,
        height: 40,
        borderRadius: BORDER_RADIUS,
        marginBottom: 2,
        flexDirection: "row",
        padding: 4,
        overflow: "hidden",
        alignItems: "center",

    },

    icon: {
        borderRightWidth: 1,
        borderRightColor: colors.secondaryTextColor,
        paddingHorizontal: COMPONENT_SPACING / 2
    },
    searchInput: {
        marginHorizontal: COMPONENT_SPACING / 2,
        flex: 1,
        color: colors.primaryTextColor,
        fontSize: 18
    },

})