"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { authStorage } from "@/lib/auth";
import { cn } from "@/lib/utils";

const links = [
  { href: "/dashboard", label: "Overview", icon: "⌂" },
  { href: "/transactions", label: "Transactions", icon: "↕" },
  { href: "/accounts", label: "Accounts", icon: "▣" },
  { href: "/categories", label: "Categories", icon: "◇" },
];
export function AppShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const logout = () => {
    authStorage.clearToken();
    router.replace("/login");
  };
  const nav = (
    <nav className="nav">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          onClick={() => setOpen(false)}
          className={cn(
            "nav-link",
            pathname === link.href && "nav-link-active",
          )}
        >
          <span aria-hidden>{link.icon}</span>
          {link.label}
        </Link>
      ))}
    </nav>
  );
  return (
    <div className="app-shell">
      <aside className={cn("sidebar", open && "sidebar-open")}>
        <Link className="brand" href="/dashboard">
          <span className="brand-mark">S</span>
          <span>SpendWise</span>
        </Link>
        {nav}
        <button className="logout" onClick={logout}>
          Sign out
        </button>
      </aside>
      {open && (
        <button
          className="sidebar-overlay"
          aria-label="Close navigation"
          onClick={() => setOpen(false)}
        />
      )}
      <main className="main">
        <header className="topbar">
          <button
            className="menu-button"
            aria-label="Open navigation"
            onClick={() => setOpen(true)}
          >
            ☰
          </button>
          <div>
            <p className="eyebrow">Personal finance</p>
            <h1>
              {links.find((link) => link.href === pathname)?.label ||
                "SpendWise"}
            </h1>
          </div>
          <div className="avatar" aria-label="Account">
            A
          </div>
        </header>
        <div className="content">{children}</div>
      </main>
    </div>
  );
}
