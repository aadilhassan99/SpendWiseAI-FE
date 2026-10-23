"use client";
import { useEffect, useState } from "react";
import {
  Badge,
  EmptyState,
  ErrorState,
  LoadingState,
  Table,
} from "@/components/ui";
import { api, ApiError } from "@/lib/api";
import type { Category } from "@/types";
export function CategoriesView() {
  const [data, setData] = useState<Category[]>();
  const [error, setError] = useState<string>();
  const load = () => {
    setError(undefined);
    api
      .get<Category[]>("/categories")
      .then(setData)
      .catch((reason: unknown) =>
        setError(
          reason instanceof ApiError
            ? reason.message
            : "Unable to load categories.",
        ),
      );
  };
  useEffect(load, []);
  if (error) return <ErrorState message={error} retry={load} />;
  if (!data) return <LoadingState label="Loading categories…" />;
  return (
    <Table
      rows={data}
      empty={
        <EmptyState
          title="No categories yet"
          description="Create categories to keep your income and expenses organized."
        />
      }
      columns={[
        { key: "name", header: "Category", render: (row) => row.name },
        {
          key: "type",
          header: "Type",
          render: (row) => (
            <Badge
              className={
                row.type === "income" ? "badge-income" : "badge-expense"
              }
            >
              {row.type}
            </Badge>
          ),
        },
      ]}
    />
  );
}
