import Layout from "@/app/components/layout";
import { getPostData, getSortedPostsData, PostData } from "../../../lib/posts";
import Image from "next/image";

// ✅ `params.id` が `undefined` にならないように、`{ id: string }[]` に統一
export async function generateStaticParams(): Promise<{ id: string }[]> {
  return getSortedPostsData().map((post) => ({
    id: post.id, // ✅ 各記事の id を Next.js に渡す
  }));
}

// ✅ `params` を `async` にすることで、`await` で確実に取得する
export default async function Post({ params }: { params?: { id?: string } }) {
  if (!params || !params.id) {
    // ✅ id が `undefined` の場合、エラーメッセージを表示
    return <p className="text-center text-red-500">記事が見つかりません。</p>;
  }

  // ✅ `await` を確実に使って `params.id` を取得する
  const postId = await Promise.resolve(params.id);

  const postData: PostData & { contentHtml: string } =
    await getPostData(postId);
  // ✅ getPostData(postId) → id に対応する記事データを取得
  // ✅ 取得したデータを postData に格納
  // ✅ PostData & { contentHtml: string } → 記事データの型を指定（本文 contentHtml も含める）

  return (
    <Layout>
      <div className="max-w-3xl mx-auto text-center">
        {/* ✅ 記事のサムネイル画像を表示 */}
        <Image
          src={postData.thumbnail} // ✅ 記事のサムネイル画像を取得
          width={800} // ✅ 幅800px
          height={400} // ✅ 高さ400px
          alt={postData.title} // ✅ 画像の alt にタイトルを設定
          className="mx-auto" // ✅ 画像を中央揃え
        />
        {/* ✅ 記事のタイトルを表示 */}
        <h1 className="text-2xl font-bold mt-4">{postData.title}</h1>
        {/* ✅ 記事の日付を表示 */}
        <p className="text-gray-500">{postData.date}</p>
        {/* ✅ 記事の本文を HTML に変換して表示 */}
        <div
          className="mt-4 text-left"
          dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
          // ✅ Markdown を HTML に変換して表示する
        />
      </div>
    </Layout>
  );
}
