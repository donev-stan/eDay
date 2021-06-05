import axios from "axios";
import { register } from "./AuthService";

const url = "http://localhost:3000";

export async function getAllSellers(searchParam) {
  const sellers = (await axios.get(`${url}/sellers`)).data;

  if (!searchParam) {
    return sellers;
  }

  return sellers.filter(
    (seller) =>
      seller.firstName.toLowerCase().includes(searchParam.toLowerCase()) ||
      seller.bio.toLowerCase().includes(searchParam.toLowerCase()) ||
      seller.lastName.toLowerCase().includes(searchParam.toLowerCase())
  );
}

export function getSellerByID(sellerID) {
  return axios.get(`${url}/sellers/${sellerID}`);
}

export function saveSeller(sellerData) {

  if (sellerData.id) {
    sellerData = {
      ...sellerData,
      picture: sellerData.picture ? sellerData.picture : `https://robohash.org/set_set5/${sellerData.firstName}${sellerData.lastName}${Math.round(Math.random() * 10)}?size=300x300`
    }
    return axios.put(`${url}/sellers/${sellerData.id}`, sellerData);
  }

  return register(sellerData);
}

export function deleteSeller(seller) {

}