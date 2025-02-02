プロジェクトディレクトリの構成
my-markdown-blog/
│── app/
│   ├── components/        # 共通コンポーネント
│   │   ├── layout.tsx     # ヘッダー・フッター付きのレイアウトコンポーネント
│   │   ├── PostItem.tsx   # 記事リストの各アイテムを表示するコンポーネント
│   │   ├── PostList.tsx   # 記事一覧を表示するコンポーネント
│   ├── posts/             # 記事詳細ページ
│   │   ├── [id]/          # 動的ルーティング（各記事ページ）
│   │   │   ├── page.tsx   # 記事の詳細ページ
│   ├── page.tsx           # ホームページ（記事一覧）
│── lib/
│   ├── posts.ts           # 記事データを取得する関数（Markdownファイルを処理）
│── public/
│   ├── images/            # 記事で使う画像
│   │   ├── first-post.jpg
│   │   ├── second-post.jpg
│── posts/                 # Markdown記事を保存するディレクトリ
│   ├── first-post.md
│   ├── second-post.md
│── .gitignore             # Gitで無視するファイルリスト
│── .eslintrc.json         # ESLintの設定
│── .prettierrc            # Prettierの設定（コードフォーマット用）
│── next.config.js         # Next.jsの設定ファイル
│── package.json           # npmのパッケージ情報
│── tailwind.config.js     # Tailwind CSSの設定ファイル
│── tsconfig.json          # TypeScriptの設定
│── README.md              # プロジェクトの説明・実行方法

# My Markdown Blog

## 🏗️ 環境セットアップ
まず、必要なパッケージをインストールしてください。

```bash
npm install

開発モードで起動する場合は、以下のコマンドを実行ください
npm run dev
※ブラウザで http://localhost:3000 にアクセスするとブログが表示されます。

本プロジェクトはPrettierを使用しています。コードを整形するには、以下を実行してください。
npm run format


