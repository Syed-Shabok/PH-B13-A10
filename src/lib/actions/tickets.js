"use server";

import { serverMutation } from "../core/server";

export const addTickets = async (data) => {
  const resData = await serverMutation("/api/tickets", "POST", data);

  return resData;
};

export const updateTickets = async (data, id) => {
  const resData = await serverMutation(`/api/tickets/${id}`, "PATCH", data);

  return resData;
};
