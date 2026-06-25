import { serverFetch } from "../core/server";

// export const getAllTickets = async () => {
//   const result = await serverFetch(`/api/tickets`);
//   return result;
// };

export const getAllTickets = async (queryString = "") => {
  const url = queryString ? `/api/tickets?${queryString}` : "/api/tickets";
  const resData = await serverFetch(url);
  return resData;
};

export const getUserMadeTickets = async (email) => {
  const result = await serverFetch(`/api/tickets/${email}`);
  //   console.log("getUserMadeTickets result: ", result);

  return result;
};

export const getTicketById = async (id) => {
  const result = await serverFetch(`/api/tickets/${id}`);
  return result;
};
