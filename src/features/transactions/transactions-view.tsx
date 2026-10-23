"use client";
import { useEffect, useState } from "react";
import { EmptyState, ErrorState, LoadingState, Table } from "@/components/ui";
import { api, ApiError } from "@/lib/api";
import { formatCurrency } from "@/lib/utils";
import type { Transaction } from "@/types";
export function TransactionsView() {
  const [data, setData] = useState<Transaction[]>();
  const [error, setError] = useState<string>();
  const load = () => {
    setError(undefined);
    api
      .get<Transaction[]>("/transactions")
      .then(setData)
      .catch((reason: unknown) =>
        setError(
          reason instanceof ApiError
            ? reason.message
            : "Unable to load transactions.",
        ),
      );
  };
  useEffect(load, []);
  if (error) return <ErrorState message={error} retry={load} />;
  if (!data) return <LoadingState label="Loading transactions…" />;
  return (
    <Table
      rows={data}
      empty={
        <EmptyState
          title="No transactions yet"
          description="Import a statement or add a transaction to begin tracking your spending."
        />
      }
      columns={[
        {
          key: "description",
          header: "Description",
          render: (row) => row.description,
        },
        {
          key: "category",
          header: "Category",
          render: (row) => row.category?.name || "Uncategorized",
        },
        {
          key: "date",
          header: "Date",
          render: (row) => new Date(row.date).toLocaleDateString(),
        },
        {
          key: "amount",
          header: "Amount",
          className: "align-right",
          render: (row) => (
            <span
              className={
                row.direction === "expense" ? "amount-expense" : "amount-income"
              }
            >
              {row.direction === "expense" ? "−" : "+"}
              {formatCurrency(row.amount, row.currency)}
            </span>
          ),
        },
      ]}
    />
  );
}
