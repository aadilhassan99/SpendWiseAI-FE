export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="auth-page">
      <div className="auth-brand">
        <span className="brand-mark">S</span>
        <span>SpendWise</span>
      </div>
      {children}
    </main>
  );
}
