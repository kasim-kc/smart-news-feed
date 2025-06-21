import axios from "axios";

const API_KEY = "e48a972515ec4b6a9f43fb40651fa734";
const BASE_URL = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`;

export const fetchArticles = async (page = 1, query = "") => {
  const url = `${BASE_URL}&page=${page}&pageSize=5${
    query ? `&q=${query}` : ""
  }`;
  const response = await axios.get(url);
  return response.data.articles;
};
