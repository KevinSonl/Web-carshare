const initialState = {
    carId: '',
    car: {},
    owner:{}
}

const carDetailReducer = (state=initialState, action) => {
    switch(action.type) {
        case "FIND_CAR_BY_ID":
            return {
                ...state,
                carId: action.carId,
                car: action.car
            }
        case "FIND_HOST_BY_ID":
            return {
                ...state,
                owner: action.owner
            }
        default:
            return state
    }
}

export default carDetailReducer
