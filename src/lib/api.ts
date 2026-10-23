import { authStorage } from "@/lib/auth";
import type { ApiErrorPayload, ApiResponse } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const GENERIC_ERROR_MESSAGE = "Something went wrong. Please try again.";

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    message: string,
    public readonly fields?: Record<string, string[]>,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

type RequestOptions = Omit<RequestInit, "body"> & {
  body?: unknown;
  authenticated?: boolean;
};

async function request<T>(
  path: string,
  options: RequestOptions = {},
): Promise<T> {
  // Deliberately do not expose configuration or transport details to end users.
  if (!API_URL) throw new ApiError(0, GENERIC_ERROR_MESSAGE);

  const { body, authenticated = true, headers, ...init } = options;
  const token = authenticated ? authStorage.getToken() : null;
  const response = await fetch(`${API_URL.replace(/\/$/, "")}${path}`, {
    ...init,
    headers: {
      Accept: "application/json",
      ...(body !== undefined ? { "Content-Type": "application/json" } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  }).catch(() => {
    throw new ApiError(0, GENERIC_ERROR_MESSAGE);
  });

  if (!response.ok) {
    const payload = (await response
      .json()
      .catch(() => ({}))) as ApiErrorPayload;
    throw new ApiError(response.status, GENERIC_ERROR_MESSAGE, payload.errors);
  }

  if (response.status === 204) return undefined as T;
  const payload = (await response.json()) as T | ApiResponse<T>;
  return typeof payload === "object" && payload !== null && "data" in payload
    ? payload.data
    : (payload as T);
}

export const api = {
  get: <T>(path: string, options?: RequestOptions) =>
    request<T>(path, { ...options, method: "GET" }),
  post: <T>(path: string, body?: unknown, options?: RequestOptions) =>
    request<T>(path, { ...options, method: "POST", body }),
  patch: <T>(path: string, body?: unknown, options?: RequestOptions) =>
    request<T>(path, { ...options, method: "PATCH", body }),
  delete: <T>(path: string, options?: RequestOptions) =>
    request<T>(path, { ...options, method: "DELETE" }),
};
