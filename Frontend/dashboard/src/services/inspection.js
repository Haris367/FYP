import api from "./api";

export const getAllInspectionRequests = () => {
  return api.get("/inspectionRequest/all");
};

export const addInspection = (payload) => {
  return api.post("/inspectionRequest/id", payload);
};
