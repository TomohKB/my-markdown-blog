import Layout from "@/app/components/layout";
import { getPostData, getSortedPostsData, PostData } from "../../../lib/posts";
import Image from "next/image";

export async function generateStaticParams() {
  return getSortedPostsData().map((post) => ({
    id: post.id,
  }));
}

export default async function Post({ params }: { params: { id: string } }) {
  const postData: PostData & { contentHtml: string } = await getPostData(
    params.id
  );

  return (
    <Layout>
      <div className="max-w-2xl mx-auto text-center p-6">
        {" "}
        {/* ✅ 中央寄せ & 余白を追加 */}
        {/* 🆕 画像を幅いっぱいに表示 */}
        <Image
          src={postData.thumbnail}
          width={800} // 画像を大きく
          height={400}
          alt={postData.title}
          className="w-full rounded-lg shadow-lg"
        />
        {/* 🆕 記事タイトルを中央寄せ＆大きく */}
        <h1 className="text-3xl font-bold mt-6">{postData.title}</h1>
        <p className="text-sm text-gray-400 mt-2">{postData.date}</p>
        {/* 🆕 記事本文を中央寄せ＆適度な余白を追加 */}
        <div
          className="text-left text-gray-300 mt-4 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
        />
      </div>
    </Layout>
  );
}
