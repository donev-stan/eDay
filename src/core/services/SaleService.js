import axios from "axios";
import { getLoggedSeller } from "./AuthService";

const url = "http://localhost:3000";

export const itemCondition = {
  New: 'New',
  Used: 'Used',
  Refurbished: 'Refurbished',
  Damaged: 'Damaged',
  Unknown: 'Unknown'
}

export async function getAllSales(searchParam) {
  const sales = (await axios.get(`${url}/sales`)).data;

  if (!searchParam) return sales;

  return sales.filter(sale => sale.title.toLowerCase().includes(searchParam.toLowerCase()) || sale.description.toLowerCase().includes(searchParam.toLowerCase()));
}

export function getSaleByID(sellerID) {
  return axios.get(`${url}/sales/${sellerID}`);
}

export function saveItem(item) {
  let { link1, link2, link3, ...tempItem } = item;

  if (item.id) {
    const updatedItem = {
      ...tempItem,
      pictures: item.pictures.length != 0 ? item.pictures : [link1, link2, link3],
      lastUpdated: new Date()
    };

    console.log(updatedItem);
    return axios.put(`${url}/sales/${item.id}`, updatedItem);
  }

  const newItem = {
    ...tempItem,
    creatorID: getLoggedSeller().id,
    pictures: [link1, link2, link3],
    createdDate: new Date(),
    lastUpdated: new Date()
  };

  return axios.post(`${url}/sales`, newItem);
}

export function deleteSale(saleID) {
  return axios.delete(`${url}/sales/${saleID}`);
}

export async function getSalesBySellerID(sellerID) {
  const sales = (await axios.get(`${url}/sales`)).data;

  console.log(sellerID);
  // if (!sellerID) throw new Error('There was a problem identifying the seller.');

  // const result = sales.filter(sale => sale.creatorID === sellerID);

  return sales.filter(sale => sale.creatorID === sellerID);
  // console.log(result);
}