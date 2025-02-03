import fs from "fs"; // ファイル操作をする Node.js の標準ライブラリ
import path from "path"; // ファイルやフォルダのパスを操作するライブラリ
import matter from "gray-matter"; // Markdown のメタデータ（フロントマター）を解析
// import { remark } from "remark"; // Markdown を HTML に変換するライブラリ
// import html from "remark-html"; // Markdown を HTML に変換するプラグイン

// 記事データの型を定義
export interface PostData {
  id: string;
  title: string;
  date: string;
  thumbnail: string;
  excerpt: string;
}

// 記事フォルダのパス
const postsDirectory = path.join(process.cwd(), "posts");
//postsDirectory: 「プロジェクトのルートフォルダ」と「postsフォルダ」をつなげる」 という処理
//process.cwd() は 「今、このプロジェクトがあるフォルダの場所（ルートディレクトリ）」 を取得する関数。
//postsは記事が入っているファイル

// 記事一覧を取得する関数
export function getSortedPostsData(): PostData[] {
  //この関数はPostData の配列（リスト）を返します！ というルールを決めている。
  const fileNames = fs.readdirSync(postsDirectory);
  //fs.readdirSync(フォルダのパス) → 指定したフォルダの中のファイル一覧を取得 する
  //Markdownファイル一覧を取得
  return fileNames
    .map((fileName) => {
      const id = fileName.replace(/\.md$/, "");
      //拡張子mdを削除して、記事のIDにする
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      //Markdownの内容を読み取る

      const matterResult = matter(fileContents);
      //gray-matterを使って、Markdaownのメタ情報をJavascriptオブジェクトに変換
      const excerpt =
        matterResult.content.replace(/\n/g, " ").slice(0, 100) + "...";
      //記事の本文の最初の 100 文字を抜粋（excerpt）として取得

      return {
        id,
        ...matterResult.data,
        excerpt,
      } as PostData;
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
  //新しい記事が先に来るようにソート
}

// 指定された記事のマークダウンデータを開き、内容を取得
export function getPostData(id: string) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  const matterResult = matter(fileContents);

  return {
    //戻り値を作る。記事データをオブジェクトの形で返す
    id,
    ...matterResult.data,
    contentHtml: matterResult.content,
  } as PostData & { contentHtml: string };
  //TypeScript に「このオブジェクトは PostData 型と contentHtml を持つよ！」と伝える
}
