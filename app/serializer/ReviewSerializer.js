export function serialize(review) {
    return {
        ...review,
        rangering: convertToEnumValue(review.rangering),
    };
}

function convertToEnumValue(value) {
    switch(value) {
        case -1:
            return "NED";
        case null:
            return "INGEN";
        case 1:
            return "OPP";
    }
}