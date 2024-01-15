import api from "./api";

export const getAllInspectionRequests = () => {
  return api.get("/inspection/all");
};

export const addInspection = (payload) => {
  return api.post("/inspection/id", payload);
};
