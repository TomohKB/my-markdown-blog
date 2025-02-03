import { notFound } from "next/navigation"; // ✅ 404ページ表示用
import Layout from "@/app/components/layout";
import { getPostData, getSortedPostsData, PostData } from "../../../lib/posts";
import Image from "next/image";

// ✅ `generateStaticParams()` の戻り値の型を `{ id: string }[]` に統一
export async function generateStaticParams(): Promise<{ id: string }[]> {
  return getSortedPostsData().map((post) => ({
    id: post.id, // ✅ 各記事の id を Next.js に渡す
  }));
}

// ✅ `params` を `await` して取得
export default async function Post({
  params,
}: {
  params: Promise<{ id?: string }>;
}) {
  const resolvedParams = await params; // ✅ `params` を `await` して中身を取得

  if (!resolvedParams?.id) {
    notFound(); // ✅ id が undefined の場合、404ページを表示
  }

  try {
    // ✅ id を明確に string 型にする
    const postId: string = resolvedParams.id as string;

    // ✅ 記事データを取得
    const postData: PostData & { contentHtml: string } =
      await getPostData(postId);

    return (
      <Layout>
        <div className="max-w-3xl mx-auto text-center">
          <Image
            src={postData.thumbnail}
            width={800}
            height={400}
            alt={postData.title}
            className="mx-auto"
          />
          <h1 className="text-2xl font-bold mt-4">{postData.title}</h1>
          <p className="text-gray-500">{postData.date}</p>
          <div
            className="mt-4 text-left"
            dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
          />
        </div>
      </Layout>
    );
  } catch (error) {
    console.error("記事データの取得に失敗しました:", error);
    notFound();
  }
}
