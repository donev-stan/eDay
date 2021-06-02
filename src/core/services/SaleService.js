import axios from "axios"

const url = "http://localhost:3000"

export function getAllSales() {
    return axios.get(`${url}/sales`)
}

export function getSaleByID(sellerID) {
    return axios.get(`${url}/sales/${sellerID}`)
}