import axios from "axios";
const opts = {
  APP_ID: "644678",
  API_KEY: "tRsPq6rjLKJtiieivlKcw7UcjJ7GfJZaLI9CB_0H03M",
};

axios.defaults.baseURL = "https://api.unsplash.com/";
// axios.defaults.headers.common["Authorization"] = opts.API_KEY;
axios.defaults.params = {
  orientation: "landscape",
};
export const getPhotos = async (query, page, per_page) => {
  const { data } = await axios.get(
    `search/photos/?client_id=${opts.API_KEY}&query=${query}&page=${page}&per_page=${per_page}`
  );
  return data;
};
