import { redirect } from "next/navigation";
import { auth } from "../auth";
import { headers } from "next/headers";

export const getUserSession = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    console.log("Session not found.");
  }

  return session?.user || null;
};

export const getUserToken = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return session?.session?.token || null;
};

export const verifyRole = async (role) => {
  const user = await getUserSession();
  if (!user) {
    redirect("/auth/signin");
  }
  if (user?.role !== role) {
    redirect("/unauthorized");
  }
  return user;
};
