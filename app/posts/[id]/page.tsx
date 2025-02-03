import Layout from "@/app/components/layout";
import { getPostData, getSortedPostsData, PostData } from "../../../lib/posts";
import Image from "next/image";

export async function generateStaticParams() {
  //generateStaticParams() を使えば、最初から id がわかるので、事前にページを作っておける
  return getSortedPostsData().map((post) => ({
    id: post.id,
  }));
}
//✅ getSortedPostsData() で「全記事のデータ」を取得する
//✅ map() を使って、記事の id だけを取り出す
//✅ Next.js に「この id のページを事前に作っておいて！」と伝える
//💡 つまり、「記事ごとに /posts/[id] のページを作る！」

export default async function Post({ params }: { params: { id: string } }) {
  if (!params || typeof params.id !== "string") {
    //id が undefined の場合、エラーメッセージを表示
    return <p className="text-center text-red-500">記事が見つかりません。</p>;
  }

  const postData: PostData & { contentHtml: string } = await getPostData(
    //getPostData(params.id) → id に対応する記事データを取得
    //取得したデータをpostDataに格納
    //PostData & { contentHtml: string } → 記事データの型を指定（本文 contentHtml も含める
    params.id
  );

  return (
    <Layout>
      <div className="max-w-3xl mx-auto text-center">
        <Image
          src={postData.thumbnail}
          width={800}
          height={400}
          alt={postData.title}
          className="mx-auto" //中央揃え
        />
        <h1 className="text-2xl font-bold mt-4">{postData.title}</h1>
        <p className="text-gray-500">{postData.date}</p>
        <div
          className="mt-4 text-left"
          dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
          //dangerouslySetInnerHTML={{ __html: postData.contentHtml }} → Markdown を HTML に変換して表示する
        />
      </div>
    </Layout>
  );
}
