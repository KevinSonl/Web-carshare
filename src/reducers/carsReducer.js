const initialState = {
    style: '',
    cars: [],
    apiCar:"",
    carId:"",
    suggestByMake:[],
    suggestByStyle:[],
    isValidVin:true,
    hasSearchCar: true,
    searchType: "",
    topCars:[]
}

const carsReducer = (state=initialState, action) => {
    switch(action.type) {
        case "FIND_CARS_BY_STYLE":
            return {
                ...state,
                style: action.style,
                cars: action.cars,
                apiCar: "",
            }
        case "FIND_ALL_CARS": {
            console.log(action.cars)
            return {
                ...state,
                cars: action.cars,
                style: "All",
                apiCar: "",
            }
        }
        case "FIND_CARS_BY_MAKE": {
            return {
                ...state,
                cars: action.cars,
                apiCar: "",
                suggestByStyle: [],
                suggestByMake:[],
                isValidVin: null,
                searchType: action.searchType
            }
        }
        case "FIND_CARS_BY_VIN": {
            return {
                ...state,
                cars: action.cars,
                apiCar: "",
                suggestCars: [],
                searchType: action.searchType
            }
        }
        case "FIND_CAR_BY_VIN": {
            return {
                ...state,
                cars: action.car,
                apiCar: "",
                suggestCars: []
            }
        }
        case "FIND_LATEST_CARS": {
            return {
                ...state,
                topCars: action.cars
            }
        }
        case "FIND_FROM_API_BY_VIN": {
            return {
                ...state,
                cars: [],
                apiCar: action.car,
                suggestCars: [],
            }
        }
        case "SUGGEST_SAME_STYLE": {
            return {
                ...state,
                suggestByStyle: action.cars,
            }
        }
        case "SUGGEST_SAME_MAKE": {
            return {
                ...state,
                suggestByMake: action.cars,
            }
        }
        case "VALIDATE_VIN": {
            return {
                ...state,
                isValidVin: action.isValidVin,
            }
        }
        case "VIN_CAR_STAT": {
            return {
                ...state,
                hasSearchCar: action.hasSearchCar,
                carId: action.carId
            }
        }
        case "CLEAR_CARS": {
            return {
                ...state,
                cars: [],
                apiCar: "",
                isValidVin:true,
                suggestByMake:[],
                suggestByStyle:[],
            }
        }

        default:
            return state
    }
}

export default carsReducer
