export const ON_VENUE_SELECTED = "ON_VENUE_SELECTED";
export const ON_VENUE_DESELECTED = "ON_VENUE_DESELECTED";
export const ON_VENUE_INFORMATION_REQUESTED = "ON_VENUE_INFORMATION_REQUESTED";

export function onVenueSelected() {
    return {
        type: ON_VENUE_SELECTED
    }
}

export function onVenueDeselected() {
    return {
        type: ON_VENUE_DESELECTED
    }
}

export function onVenueInformationRequested() {
    return {
        type: ON_VENUE_INFORMATION_REQUESTED
    }
}