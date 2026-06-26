"use server";

import { protectedFetch } from "../core/server";

export const getUserProfile = async (email) => {
  return await protectedFetch(`/api/users/${email}`);
};
