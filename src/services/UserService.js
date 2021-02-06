import axios from 'axios';

export default class UserService {
    constructor() {
        // this.renterUrl="http://localhost:8080/api/users/renters";
        // this.ownerUrl="http://localhost:8080/api/users/owners"
        this.renterUrl="https://frozen-scrubland-46936.herokuapp.com/api/users/renters";
        this.ownerUrl="https://frozen-scrubland-46936.herokuapp.com/api/users/owners"
    }

    createRenter(renter) {
        return axios.post(this.renterUrl,renter);
    }

    createOwner(owner){
        return axios.post(this.ownerUrl,owner);
    }

    updateRenter(rid,renter){
        let newUrl = this.renterUrl + '/' + rid;
        return axios.put(newUrl,renter);
    }

    updateOwner(oid,owner){
        let newUrl = this.ownerUrl + '/' + oid;
        return axios.put(newUrl,owner);
    }

    deleteRenter(rid){
        let newUrl = this.renterUrl + '/' + rid;
        return axios.delete(newUrl);
    }

    deleteOwner(oid){
        let newUrl = this.ownerUrl + '/' + oid;
        return axios.delete(newUrl);
    }

    findAllRenters(){
        return axios.get(this.renterUrl);
    }

    findAllOwners(){
        return axios.get(this.ownerUrl);
    }

    findRenterById(rid){
        let newUrl = this.renterUrl + '/' + rid;
        return axios.get(newUrl)
    }

    findOwnerById(oid){
        let newUrl = this.ownerUrl + '/' + oid;
        return axios.get(newUrl)
    }

    findRenterByName(username){
        let newUrl = this.renterUrl + '/username/' + username;
        return axios.get(newUrl)
    }

    findOwnerByName(username){
        let newUrl = this.ownerUrl + '/username/' + username;
        return axios.get(newUrl)
    }

    findLikeListByUser(rid){
        let newUrl = this.renterUrl + '/' + rid + '/like';
        return axios.get(newUrl);
    }

    findVehiclesByUser(oid){
        let newUrl = this.ownerUrl + '/' + oid + '/vehicles';
        return axios.get(newUrl);
    }

}
