import api from "./api";

export const getAllProducts = () => {
  return api.get("/products/all");
};

export const addProduct = (payload) => {
  return api.post("/products/id", payload);
};
