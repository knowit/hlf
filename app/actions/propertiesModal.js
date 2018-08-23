export const ON_CLOSE_PROPERTY_INFORMATION_MODAL = "ON_CLOSE_PROPERTY_INFORMATION_MODAL";
export const ON_OPEN_PROPERTY_INFORMATION_MODAL = "ON_OPEN_PROPERTY_INFORMATION_MODAL";

export function onOpenPropertyInformationModal(property) {
    return {
        type: ON_OPEN_PROPERTY_INFORMATION_MODAL,
        payload: property
    }
}

export function onClosePropertyInformationModal() {
    return {
        type: ON_CLOSE_PROPERTY_INFORMATION_MODAL
    }
}