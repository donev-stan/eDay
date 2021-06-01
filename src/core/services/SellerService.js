import axios from "axios"

const url = "http://localhost:3000"

export function getAllSellers() {
    return axios.get(`${url}/sellers`)
}

export function getSellerByID(sellerID) {
    return axios.get(`${url}/sellers/${sellerID}`)
}