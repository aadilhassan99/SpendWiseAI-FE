"use client";
import { useEffect, useState } from "react";
import { Card, EmptyState, ErrorState, LoadingState } from "@/components/ui";
import { api, ApiError } from "@/lib/api";

type Summary = { income: number; expenses: number; netCashFlow: number };
export function DashboardView() {
  const [data, setData] = useState<Summary>();
  const [error, setError] = useState<string>();
  const load = () => {
    setError(undefined);
    api
      .get<Summary>("/analytics/summary")
      .then(setData)
      .catch((reason: unknown) =>
        setError(
          reason instanceof ApiError
            ? reason.message
            : "Unable to load dashboard.",
        ),
      );
  };
  useEffect(load, []);
  if (error) return <ErrorState message={error} retry={load} />;
  if (!data) return <LoadingState label="Loading your financial overview…" />;
  return (
    <>
      <section className="summary-grid">
        <Card>
          <p>Income</p>
          <strong>{data.income}</strong>
        </Card>
        <Card>
          <p>Expenses</p>
          <strong>{data.expenses}</strong>
        </Card>
        <Card>
          <p>Net cash flow</p>
          <strong>{data.netCashFlow}</strong>
        </Card>
      </section>
      <EmptyState
        title="Your dashboard is ready"
        description="Add an account or import transactions to see your financial overview."
      />
    </>
  );
}
