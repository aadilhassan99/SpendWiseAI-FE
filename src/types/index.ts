export type ApiErrorPayload = {
  message?: string;
  errors?: Record<string, string[]>;
};

export type ApiResponse<T> = { data: T; message?: string };

export type User = {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
};

export type AuthSession = { accessToken: string; user: User };

export type LoginPayload = { email: string; password: string };
export type RegisterPayload = LoginPayload & {
  firstName: string;
  lastName: string;
};

export type Transaction = {
  id: string;
  description: string;
  amount: number;
  currency: string;
  date: string;
  direction: "income" | "expense";
  category?: { id: string; name: string };
  account?: { id: string; name: string };
};

export type FinancialAccount = {
  id: string;
  name: string;
  type: string;
  currency: string;
  balance?: number;
};
export type Category = {
  id: string;
  name: string;
  type: "income" | "expense";
  color?: string;
};
