import { protectedFetch } from "../core/server";

export const getPassengerTransactions = async (email) => {
  if (!email) return [];
  return await protectedFetch(`/api/payments/passenger/${email}`);
};
