import axios from "axios";

const url = "http://localhost:3000";

export async function getAllSales(searchParam) {
  const sales = (await axios.get(`${url}/sales`)).data;

  if (!searchParam) return sales;

  return sales.filter(sale => sale.title.toLowerCase().includes(searchParam.toLowerCase()) || sale.description.toLowerCase().includes(searchParam.toLowerCase()));
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
