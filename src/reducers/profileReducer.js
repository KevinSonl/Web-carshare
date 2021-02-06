const initialState = {
    tripHistory: [],
    ownedVehicles: [],
    likeCars:[]
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case "FIND_TRIP_HISTORY":
            return {
                ...state,
                tripHistory: action.tripHistory,
            }
        case "FIND_CARS_FOR_OWNER":
            return {
                ...state,
                ownedVehicles: action.cars,
            }
        case "FIND_LIKE_FOR_OWNER":
            return {
                ...state,
                likeCars: action.likeCars,
            }
        default:
            return state
    }
}


export default profileReducer
