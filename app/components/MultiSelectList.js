import React from 'react';
import MyListItem from './MyListItem';
import FlatList from 'react-native';

class MultiSelectList extends React.PureComponent {
    state = {selected: (new Map())};

    _keyExtractor = (item, index) => item.id;

    _onPressItem = (id) => {
        this.setState((state) => {
            // copy the map rather than modifying state.
            const selected = new Map(state.selected);
            selected.set(id, !selected.get(id)); // toggle
            return {selected};
        });
    };

    _renderItem = ({item}) => (
        <MyListItem
            id={item.id}
            onPressItem={this._onPressItem}
            selected={!!this.state.selected.get(item.id)}
            title={item.title}/>
    );

    render() {
        return (
            <FlatList
                data={this.props.data}
                extraData={this.state}
                keyExtractor={this._keyExtractor}
                renderItem={this._renderItem} />
        );
    };
}
