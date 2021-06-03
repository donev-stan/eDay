import axios from "axios"

const url = "http://localhost:3000"

export async function getAllSellers(searchParam) {
    const sellers = (await axios.get(`${url}/sellers`)).data;

    if (!searchParam) return sellers;

    return sellers.filter(seller => seller.firstName.toLowerCase().includes(searchParam.toLowerCase()) || seller.bio.toLowerCase().includes(searchParam.toLowerCase()) || seller.lastName.toLowerCase().includes(searchParam.toLowerCase()));
}

export function getSellerByID(sellerID) {
    return axios.get(`${url}/sellers/${sellerID}`)
}