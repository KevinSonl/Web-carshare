import axios from 'axios';

// const url = 'http://localhost:8080/api/vehicles'
const url='https://frozen-scrubland-46936.herokuapp.com/api/vehicles'

export function findCarsByStyle(style) {
    return fetch(`${url}/style/${style}`)
        .then(response => response.json())
}

export function findCarById(carId) {
    return fetch(`${url}/${carId}`)
        .then(response => response.json())
}

export function findCarByIdAxios(carId){
    return axios.get(`${url}/${carId}`);
}

export function findCarByVin(vin) {
    return axios.get(`${url}/vin/${vin}`);
}

//search!!!
export function findAllCars() {
    return fetch(`${url}`)
        .then(response => response.json())
}

export function findCarsByMake(make) {
    return fetch(`${url}/make/${make}`)
        .then(response => response.json())
}

export function updateCar(vid, car) {
    let newUrl = url + '/' + vid;
    return axios.put(newUrl,car);
}

export function createCar(car) {
    return axios.post(url,car);
}

export function deleteCar(vid) {
    let newUrl = url + '/' + vid;
    return axios.delete(newUrl);
}


export const findSpecsByVin = (vin) =>
    fetch("https://vindecoder.p.rapidapi.com/decode_vin?vin="+vin, {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "34493d1342msh595cec8c0bbf4aep1e9196jsne399e70533b3",
            "x-rapidapi-host": "vindecoder.p.rapidapi.com"
        }
    }).then(response => response.json())
        .catch(function () {
            console.log("error")
        })

export const findLatestCars = () =>
    fetch(`${url}/latest`)
        .then(response => response.json())

export default {
    findLatestCars,
}
