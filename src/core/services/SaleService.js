import axios from "axios";

const url = "http://localhost:3000";

export function getAllSales() {
  return axios.get(`${url}/sales`);
}

export function getSaleByID(sellerID) {
  return axios.get(`${url}/sales/${sellerID}`);
}

export function sellItem(item) {
  let { link1, link2, link3, ...tempItem } = item;

  const newItem = {
    ...tempItem,
    pictures: [link1, link2, link3],
  };
}
