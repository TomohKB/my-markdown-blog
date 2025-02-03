import { notFound } from "next/navigation"; // ✅ `notFound()` をインポート
import Layout from "@/app/components/layout";
import { getPostData, getSortedPostsData, PostData } from "../../../lib/posts";
import Image from "next/image";

// ✅ `params.id` が `undefined` にならないように `id: string[]` に統一
export async function generateStaticParams(): Promise<{ id: string }[]> {
  return getSortedPostsData().map((post) => ({
    id: post.id, // ✅ 各記事の id を Next.js に渡す
  }));
}

// ✅ `params.id` を非同期関数の中で適切に処理
export default async function Post({ params }: { params?: { id?: string } }) {
  if (!params?.id) {
    // ✅ `notFound()` を使って 404 ページを返す
    notFound();
  }

  // ✅ 記事データを取得
  const postData: PostData & { contentHtml: string } = await getPostData(
    params.id
  );

  return (
    <Layout>
      <div className="max-w-3xl mx-auto text-center">
        {/* ✅ 記事のサムネイル画像を表示 */}
        <Image
          src={postData.thumbnail}
          width={800}
          height={400}
          alt={postData.title}
          className="mx-auto"
        />
        {/* ✅ 記事のタイトルを表示 */}
        <h1 className="text-2xl font-bold mt-4">{postData.title}</h1>
        {/* ✅ 記事の日付を表示 */}
        <p className="text-gray-500">{postData.date}</p>
        {/* ✅ 記事の本文を HTML に変換して表示 */}
        <div
          className="mt-4 text-left"
          dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
        />
      </div>
    </Layout>
  );
}
