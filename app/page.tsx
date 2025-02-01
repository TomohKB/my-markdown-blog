import { getSortedPostsData, PostData } from "../lib/posts";
import Layout from "./components/layout";
import PostList from "./components/PostList";


export default function Home() {
  const posts: PostData[] = getSortedPostsData();

  return (
    <Layout>
      <h1>ブログ一覧</h1>
      <PostList posts={posts} />
    </Layout>
  );
}
