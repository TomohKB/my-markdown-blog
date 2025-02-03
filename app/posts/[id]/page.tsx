import Layout from "@/app/components/layout";
import { getPostData, getSortedPostsData, PostData } from "../../../lib/posts";
import Image from "next/image";

export async function generateStaticParams(): Promise<{ id: string }[]> {
  // ✅ generateStaticParams() を使えば、最初から id がわかるので、事前にページを作っておける
  return getSortedPostsData().map((post) => ({
    id: post.id, // ✅ 各記事の id を Next.js に渡して、静的ページを作成
  }));
}

// ✅ getSortedPostsData() で「全記事のデータ」を取得する
// ✅ map() を使って、記事の id だけを取り出す
// ✅ Next.js に「この id のページを事前に作っておいて！」と伝える
// 💡 つまり、「記事ごとに /posts/[id] のページを作る！」

export default async function Post({ params }: { params: { id?: string } }) {
  if (!params?.id) {
    // ✅ id が undefined の場合、エラーメッセージを表示
    return <p className="text-center text-red-500">記事が見つかりません。</p>;
  }

  const postData: PostData & { contentHtml: string } = await getPostData(
    params.id
  );
  // ✅ getPostData(params.id) → id に対応する記事データを取得
  // ✅ 取得したデータを postData に格納
  // ✅ PostData & { contentHtml: string } → 記事データの型を指定（本文 contentHtml も含める）

  return (
    <Layout>
      <div className="max-w-3xl mx-auto text-center">
        <Image
          src={postData.thumbnail}
          width={800}
          height={400}
          alt={postData.title}
          className="mx-auto" // ✅ 画像を中央揃え
        />
        <h1 className="text-2xl font-bold mt-4">{postData.title}</h1>
        <p className="text-gray-500">{postData.date}</p>
        <div
          className="mt-4 text-left"
          dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
          // ✅ Markdown を HTML に変換して表示する
        />
      </div>
    </Layout>
  );
}
