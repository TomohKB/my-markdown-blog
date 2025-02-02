import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      {" "}
      {/* ✅ 画面全体を縦に配置 */}
      {/* ヘッダー */}
      <header className="bg-gray-900 text-white py-4 px-6">
        {" "}
        {/* ✅ ヘッダーの余白を調整 */}
        <nav className="flex items-center">
          {" "}
          {/* ✅ 横並びにする */}
          <Link href="/" className="text-white text-lg font-bold ml-[100px] hover:text-blue-500 hover:underline">
            My Markdown Blog
          </Link>
        </nav>
      </header>
      {/* メインコンテンツ */}
      <main className="flex-1 p-5">{children}</main>{" "}
      {/* ✅ メイン部分を可変に */}
      {/* フッター */}
      <footer className="bg-gray-900 text-white text-center py-3">
        © 2025 My Markdown Blog. All rights reserved.
      </footer>
    </div>
  );
}
