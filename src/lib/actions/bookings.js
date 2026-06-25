"use server";

import { serverMutation } from "../core/server";

export const addBooking = async (data) => {
  const resData = await serverMutation("/api/bookings", "POST", data);

  return resData;
};

export const updateBookingStatus = async (id, status) => {
  return await serverMutation(`/api/bookings/${id}/status`, "PATCH", {
    status,
  });
};
