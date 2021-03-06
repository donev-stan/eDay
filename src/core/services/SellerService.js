import axios from "axios";
import { logout, register } from "./AuthService";
import { deleteSale, getSalesBySellerID } from "./SaleService";

const url = "http://localhost:3000";

export async function getAllSellers(searchParam) {
  const sellers = (await axios.get(`${url}/sellers`)).data;

  if (!searchParam) {
    return sellers;
  }

  return sellers.filter(
    (seller) =>
      seller.firstName.toLowerCase().includes(searchParam.toLowerCase()) ||
      seller.lastName.toLowerCase().includes(searchParam.toLowerCase()) ||
      seller.bio.toLowerCase().includes(searchParam.toLowerCase()) ||
      seller.email.toLowerCase().includes(searchParam.toLowerCase())
  );
}

export function getSellerByID(sellerID) {
  return axios.get(`${url}/sellers/${sellerID}`);
}

export async function saveSeller(sellerData) {

  if (sellerData.id) {
    const users = await getAllSellers();

    if (users.find((u) => u.email === sellerData.email && u.id !== sellerData.id)) {
      throw new Error("This email address is already registered by another user!");
    } else if (users.find((u) => u.phone === sellerData.phone  && u.id !== sellerData.id)) {
      throw new Error("This phone number is already registered by another user!");
    }

    sellerData = {
      ...sellerData,
      address: {
        city: sellerData.city,
        zip: sellerData.zip
      },
      picture: sellerData.picture
        ? sellerData.picture
        : `https://robohash.org/set_set5/${sellerData.firstName}${
            sellerData.lastName
          }${Math.round(Math.random() * 10)}?size=300x300`,
    };
    delete sellerData.city;
    delete sellerData.zip;

    return axios.put(`${url}/sellers/${sellerData.id}`, sellerData);
  }

  return register(sellerData);
}

export async function deleteSeller(sellerID) {

  const sales = await getSalesBySellerID(sellerID);

  const deleteRequests = [];
  sales.forEach(sale => {
    deleteRequests.push(deleteSale(sale.id));
  });

  await Promise.all(deleteRequests);

  logout();

  return axios.delete(`${url}/sellers/${sellerID}`);
}
