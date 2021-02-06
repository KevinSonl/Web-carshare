import axios from 'axios';

export default class TripService{
    constructor() {
         this.tripUrl= "http://localhost:8080/api/trips";
         this.renterUrl= "http://localhost:8080/api/users/renters";
         this.ownerUrl = "http://localhost:8080/api/users/owners";
         this.vehicleUrl = "http://localhost:8080/api/vehicles";

/*        this.tripUrl= "https://frozen-scrubland-46936.herokuapp.com/api/trips";
        this.renterUrl= "https://frozen-scrubland-46936.herokuapp.com/api/users/renters";
        this.ownerUrl = "https://frozen-scrubland-46936.herokuapp.com/api/users/owners";
        this.vehicleUrl = "https://frozen-scrubland-46936.herokuapp.com/api/vehicles";*/
    }

    createTrip(trip){
        return axios.post(this.tripUrl,trip);
    }

    findAllTrips(){
        return axios.get(this.tripUrl)
    }

    findTripById(tid){
        let newUrl=this.tripUrl + '/' + tid;
        return axios.get(newUrl);
    }

    findTripsForRenter(rid){
        let newUrl = this.renterUrl + '/' + rid +'/trip_history';
        return axios.get(newUrl);
    }

    findTripsForOwner(oid){
        let newUrl = this.ownerUrl + '/' + oid + '/rent_history';
        return axios.get(newUrl);
    }

    findTripsForVehicle(vid){
        let newUrl = this.vehicleUrl + '/' + vid + '/renter_history';
        return axios.get(newUrl);
    }

    updateTrip(tid,trip){
        let newUrl = this.tripUrl + '/' + tid;
        return axios.put(newUrl,trip);
    }

    deleteTrip(tid){
        let newUrl = this.tripUrl + '/' + tid;
        return axios.delete(newUrl);
    }

}
