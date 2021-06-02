import { getAllSellers } from "./SellerService";
import axios from 'axios';

const url = "http://localhost:3000"

export function getLoggedSeller() {
    return JSON.parse(localStorage.getItem('loggedSeller'));
}

export async function login(sellerData) {
    const sellers = (await getAllSellers()).data;

    const loggedSeller = sellers.find(s => s.email === sellerData.email && s.password === sellerData.password.toString());

    if (loggedSeller) {
        localStorage.setItem('loggedSeller', JSON.stringify(loggedSeller));
        return;
    }

    throw new Error('Invalid username or password')
}

export async function register(userData) {
    const users = (await getAllSellers()).data;

    if (users.find(u => u.email === userData.email)) {
        throw new Error('Email already exists!');
    }

    userData = {
        ...userData,
        picture: `https://robohash.org/set_set2/${userData.firstName}${userData.lastName}?size=300x300`
    }

    return axios.post(`${url}/sellers`, userData);
}