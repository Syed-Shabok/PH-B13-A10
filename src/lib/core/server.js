import { redirect } from "next/navigation";
import { getUserToken } from "./session";

export const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const authHeader = async () => {
  const token = await getUserToken();
  return token
    ? {
        authorization: `Bearer ${token}`,
      }
    : {};
};

// handles errors codes
const handleStatusCode = async (res) => {
  if (res.status === 401) {
    redirect("/auth/signin");
  } else if (res.status === 403) {
    redirect("/unauthorized");
  }

  try {
    return await res.json();
  } catch (e) {
    return { error: true, status: res.status };
  }
};

export const serverMutation = async (path, method, data) => {
  const res = await fetch(`${baseUrl}${path}`, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      ...(await authHeader()),
    },
    body: JSON.stringify(data),
  });
  return handleStatusCode(res);
};

// For PUBLIC routes (No token)
export const serverFetch = async (path) => {
  const res = await fetch(`${baseUrl}${path}`);
  return handleStatusCode(res);
};

// For PROTECTED routes (Includes token)
export const protectedFetch = async (path) => {
  const res = await fetch(`${baseUrl}${path}`, {
    headers: await authHeader(),
  });
  return handleStatusCode(res);
};

// Fixed to include authentication headers
export const deleteMutation = async (path) => {
  const res = await fetch(`${baseUrl}${path}`, {
    method: "DELETE",
    headers: await authHeader(),
  });
  return handleStatusCode(res);
};
