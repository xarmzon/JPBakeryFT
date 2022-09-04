type TApiProps = {
  path: string;
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  data?: any;
  options?: RequestInit;
};

const base = "http://localhost:8000/api";

export const api = async ({ path, method, data, options }: TApiProps) => {
  const url = base + path;
  return await fetch(url, {
    method: method,
    body: JSON.stringify(data) || undefined,
    ...options,
  });
};
