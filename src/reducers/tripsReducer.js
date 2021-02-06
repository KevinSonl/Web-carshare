const initialState = {
    trips:[]
}

const tripsReducer = (state=initialState, action) => {
    switch(action.type) {
        case "FIND_ALL_TRIPS":
            return {
                trips: action.trips
            }
        case "FIND_TRIP_FOR_USER":
            return {
                trips:action.trips
            }
        default:
            return state
    }
}

export default tripsReducer
