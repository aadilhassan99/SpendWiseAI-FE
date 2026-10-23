import { api } from "@/lib/api";
import type { AuthSession, LoginPayload, RegisterPayload } from "@/types";
export const authApi = {
  login: (payload: LoginPayload) =>
    api.post<AuthSession>("/auth/login", payload, { authenticated: false }),
  register: (payload: RegisterPayload) =>
    api.post<AuthSession>("/auth/register", payload, { authenticated: false }),
};
