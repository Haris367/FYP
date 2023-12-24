import api from "./api";

export const addProduct = (payload) => {
  return api.post("/products/id", payload);
};
