import react from 'react';
import { TouchableOpacity } from 'react-native';

export default class MyListItem extends React.PureComponent {
    _onPress = () => {
        this.props.onPressItem(this.props.id);
    };

    render() {
        const textColor = this.props.selected ? "red" : "black";
        return (
          <TouchableOpacity onPress={this._onPress}>
            <View>
                <Text style={{ color: textColor }}>
                    {this.props.title}
                </Text>
            </View>
          </TouchableOpacity>
        );
    }
}