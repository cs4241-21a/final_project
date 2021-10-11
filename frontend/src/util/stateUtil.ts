import US_STATE_NAMES from '../data/geo/states';


export const getLongStateNameFromShort = (shortName: string) => {
    const stateEntry = US_STATE_NAMES.find(state => state[1] === shortName);
    if (stateEntry) {
        return stateEntry[0];
    }
    return "";
}

export const getShortStateNameFromLong = (longName: string) => {
    const lowerName = longName.toLowerCase();
    const stateEntry = US_STATE_NAMES.find(state => state[0].toLowerCase() === lowerName);
    if (stateEntry) {
        return stateEntry[1];
    }
    console.log("couldn't find short name for", longName);
    
    return "";
}

