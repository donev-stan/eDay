import { getAllSellers } from "./SellerService";
import axios from 'axios';

const url = "http://localhost:3000"

export function getLoggedSeller() {
    const loggedSeller = JSON.parse(localStorage.getItem('loggedSeller'));

    if (!loggedSeller) {
        return undefined;
    }

    return loggedSeller;
}

export async function login(sellerData) {
    const sellers = await getAllSellers();

    const loggedSeller = sellers.find(s => s.email === sellerData.email && s.password === sellerData.password.toString());

    if (loggedSeller) {
        localStorage.setItem('loggedSeller', JSON.stringify(loggedSeller));
        return;
    }

    throw new Error('Invalid username or password')
}

export async function register(userData) {
    const users = await getAllSellers();

    if (users.find(u => u.email === userData.email)) {
        throw new Error('Email already exists!');
    } else if (users.find(u => u.phone === userData.phone)) {
        throw new Error('User already registered with this phone number!');
    }

    userData = {
        ...userData,
        picture: userData.picture ? userData.picture : `https://robohash.org/set_set5/${userData.firstName}${userData.lastName}${Math.round(Math.random() * 10)}?size=300x300`,
        badges: ['New'],
        createdDate: new Date()
    }

    return axios.post(`${url}/sellers`, userData);
}

export function logout() {
    return localStorage.removeItem('loggedSeller');
}