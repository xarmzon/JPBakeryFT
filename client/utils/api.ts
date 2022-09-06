type TApiProps = {
  path: string;
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  data?: any;
  options?: RequestInit;
};

const base = "http://localhost:8000";

export const api = async ({ path, method, data, options }: TApiProps) => {
  const url = base + path;
  let token = localStorage.getItem("user");
  if (token) {
    token = JSON.parse(token);
  }
  const authorization = token ? `Bearer ${token}` : "";
  return await fetch(url, {
    method: method,
    body: JSON.stringify(data) || undefined,
    // credentials: "include",
    ...options,
    headers: {
      ...options?.headers,
      Authorization: authorization,
    },
  });
};
