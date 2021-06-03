import axios from "axios";

const url = "http://localhost:3000";

export function sellItem(item) {
  let { link1, link2, link3, ...tempItem } = item;

  const newItem = {
    ...tempItem,
    pictures: [link1, link2, link3],
  };

  
}
