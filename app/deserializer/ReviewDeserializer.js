export function deserialize(review) {
    return {
        date: review.dato,
        comment: review.kommentar ? review.kommentar : "",
        value: convertToIntegerValue(review.rangering),
        id: review.id,
        type: review.vurderingsType,
        key: review.id,
    };
}

function convertToIntegerValue(value) {
    switch(value) {
        case "NED":
            return -1;
        case "INGEN":
            return null;
        case "OPP":
            return 1;
        default:
            return null;
    }
}