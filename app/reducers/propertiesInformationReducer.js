import {
    ON_OPEN_PROPERTY_INFORMATION_MODAL,
    ON_CLOSE_PROPERTY_INFORMATION_MODAL
} from "../actions/propertiesModal";

export default (state = {
   modalVisible: false,
   currentProperty: {}
}, action) => {
    switch(action.type) {
        case ON_OPEN_PROPERTY_INFORMATION_MODAL:
            const property = action.payload;
            return {
                modalVisible: true, currentProperty: property
            };
        case ON_CLOSE_PROPERTY_INFORMATION_MODAL:
            return {
                modalVisible: false,
                currentProperty: {}
            };
        default:
            return state;
    }
};