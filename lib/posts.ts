import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

// 記事データの型を定義
export interface PostData {
  id: string;
  title: string;
  date: string;
  thumbnail: string;
  excerpt: string; // 🆕 記事の要約を追加
}

// `posts/` フォルダのパスを取得
const postsDirectory = path.join(process.cwd(), "posts");

// 🆕 記事一覧を取得（要約を含める）
export function getSortedPostsData(): PostData[] {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .map((fileName) => {
      const id = fileName.replace(/\.md$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");

      const matterResult = matter(fileContents);

      // 本文の最初の100文字を取得（HTMLタグを削除）
      const excerpt =
        matterResult.content.replace(/\n/g, " ").slice(0, 100) + "...";

      return {
        id,
        ...matterResult.data,
        excerpt, // 🆕 追加
      } as PostData;
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

// 🆕 記事の詳細を取得（getPostData がないとエラーになる）
export async function getPostData(
  id: string
): Promise<PostData & { contentHtml: string }> {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  const matterResult = matter(fileContents);

  // Markdown を HTML に変換
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  return {
    id,
    contentHtml,
    ...matterResult.data,
  } as PostData & { contentHtml: string };
}
