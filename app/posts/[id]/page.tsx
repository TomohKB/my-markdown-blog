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
      <Image
        src={postData.thumbnail}
        width={500}
        height={200}
        alt={postData.title}
      />
      <h1>{postData.title}</h1>
      <p>{postData.date}</p>
      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
    </Layout>
  );
}
