import { notFound } from "next/navigation"; // ✅ 404ページを表示するための関数
import Layout from "@/app/components/layout";
import { getPostData, getSortedPostsData, PostData } from "../../../lib/posts";
import Image from "next/image";

// ✅ `generateStaticParams` で id の型を `string` に統一
export async function generateStaticParams(): Promise<{ id: string }[]> {
  return getSortedPostsData().map((post) => ({
    id: post.id.toString(), // ✅ id を string に変換
  }));
}

// ✅ `params.id` を `string` 型に変換し、undefined の場合の処理を追加
export default async function Post({ params }: { params: { id?: string } }) {
  if (!params?.id) {
    // ✅ `params.id` が `undefined` の場合、404ページを表示
    notFound();
  }

  try {
    // ✅ `params.id` を `string` 型に確実に変換
    const postId: string = String(params.id);

    // ✅ 記事データを取得
    const postData: PostData & { contentHtml: string } =
      await getPostData(postId);

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
  } catch (error) {
    console.error("記事の取得中にエラー:", error);
    notFound();
  }
}
