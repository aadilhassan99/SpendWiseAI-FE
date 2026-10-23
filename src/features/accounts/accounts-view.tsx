"use client";
import { useEffect, useState } from "react";
import { Card, EmptyState, ErrorState, LoadingState } from "@/components/ui";
import { api, ApiError } from "@/lib/api";
import { formatCurrency } from "@/lib/utils";
import type { FinancialAccount } from "@/types";
export function AccountsView() {
  const [data, setData] = useState<FinancialAccount[]>();
  const [error, setError] = useState<string>();
  const load = () => {
    setError(undefined);
    api
      .get<FinancialAccount[]>("/accounts")
      .then(setData)
      .catch((reason: unknown) =>
        setError(
          reason instanceof ApiError
            ? reason.message
            : "Unable to load accounts.",
        ),
      );
  };
  useEffect(load, []);
  if (error) return <ErrorState message={error} retry={load} />;
  if (!data) return <LoadingState label="Loading accounts…" />;
  if (!data.length)
    return (
      <EmptyState
        title="No accounts yet"
        description="Create an account to organize transactions and balances."
      />
    );
  return (
    <section className="card-grid">
      {data.map((account) => (
        <Card key={account.id}>
          <p className="eyebrow">{account.type}</p>
          <h2>{account.name}</h2>
          <strong>
            {account.balance === undefined
              ? "Balance unavailable"
              : formatCurrency(account.balance, account.currency)}
          </strong>
          <p className="muted">{account.currency}</p>
        </Card>
      ))}
    </section>
  );
}
