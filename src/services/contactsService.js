import { apiClient } from "./api";

export const fetchContacts = async ({ searchQuery = "", fromDate = "", toDate = "", page = 1 } = {}) => {
  const params = new URLSearchParams({ searchQuery, fromDate, toDate, page }).toString();
  return apiClient(`/users?${params}`);
};
