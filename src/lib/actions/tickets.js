"use server";

import { serverMutation } from "../core/server";

export const addTickets = async (data) => {
  const resData = await serverMutation("/api/tickets", "POST", data);

  return resData;
};
