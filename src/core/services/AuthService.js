import { getAllSellers } from "./SellerService";

/**
 * @params the logged seller or undefined
 */
export function getLoggedSeller() {
    return JSON.parse(localStorage.getItem('loggedSeller'));
}

/**
 * @param sellerData => {username, password} 
 */
export async function login(sellerData) {
    const sellers = (await getAllSellers()).data;

    const loggedSeller = sellers.find(s => s.email === sellerData.email && s.password === sellerData.password.toString());

    if (loggedSeller) {
        localStorage.setItem('loggedSeller', JSON.stringify(loggedSeller));
        return;
    }

    throw new Error('Invalid username or password')
}