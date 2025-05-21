const API_BASE_URL = "https://testapi1.parseq.pro";

type HttpMethod = "GET" | "POST" | "PATCH" | "DELETE";

export async function apiRequest<T = unknown>(
  endpoint: string,
  method: HttpMethod = "GET",
  body?: Record<string, unknown> | string | string[]
) {
  const url = `${API_BASE_URL}${endpoint}`;
  const options: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  };

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(
        errorData?.message || `Ошибка запроса ${response.status}`
      );
    }
    if (method === "GET") {
      return (await response.json()) as T;
    }
    return response as T;
  } catch (error) {
    throw error;
  }
}
