export const ON_VENUE_SELECTED = "ON_VENUE_SELECTED";
export const ON_VENUE_DESELECTED = "ON_VENUE_DESELECTED";
export const ON_VENUE_INFORMATION_REQUESTED = "ON_VENUE_INFORMATION_REQUESTED";
export const ON_VENUE_SCREEN_CHANGE = "ON_VENUE_SCREEN_CHANGE";

export function onVenueDeselected() {
    return {
        type: ON_VENUE_DESELECTED
    }
}

export function onVenueInformationRequested(placeId) {
    return {
        type: ON_VENUE_INFORMATION_REQUESTED,
        payload: placeId
    }
}

export function onVenueScreenChange(screen) {
    return {
        type: ON_VENUE_SCREEN_CHANGE,
        payload: screen
    }
}