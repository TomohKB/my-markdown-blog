import { getSortedPostsData, PostData } from "../lib/posts";
import Layout from "./components/layout";
import PostList from "./components/PostList";


export default function Home() {
  const posts: PostData[] = getSortedPostsData();

  return (
    <Layout>
      <h1 className="mb-[20px] font-bold text-yellow-300 text-center">ブログ一覧</h1>
      <PostList posts={posts} />
    </Layout>
  );
}
