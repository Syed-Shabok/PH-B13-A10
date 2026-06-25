import { serverFetch } from "../core/server";

export const getPassengerBookings = async (email) => {
  return await serverFetch(`/api/bookings/passenger/${email}`);
};
