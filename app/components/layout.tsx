import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      {/* ヘッダー */}
      <header
        style={{
          backgroundColor: "#222",
          color: "#fff",
          padding: "10px 20px",
          textAlign: "center",
        }}
      >
        <h1>My Markdown Blog</h1>
        <nav>
          <Link href="/" style={{ color: "#fff", marginRight: "15px" }}>
            ホーム
          </Link>
        </nav>
      </header>

      {/* メインコンテンツ */}
      <main style={{ flex: 1, padding: "20px" }}>{children}</main>

      {/* フッター */}
      <footer
        style={{
          backgroundColor: "#222",
          color: "#fff",
          textAlign: "center",
          padding: "10px",
        }}
      >
        © 2025 My Markdown Blog. All rights reserved.
      </footer>
    </div>
  );
}
