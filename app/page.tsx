import { getSortedPostsData, PostData } from "../lib/posts";
import Layout from "./components/layout";
import PostList from "./components/PostList";

export default function Home() {
  //home ってトップページって意味
  const posts: PostData[] = getSortedPostsData();
  //記事の一覧を取得してpostsに保存する
  //JavaScript や TypeScript では =（イコール）は「右側の値を左側の変数に代入する」という意味
  //postsの型をPostData[]にしてる
  //const posts = getSortedPostsData()でもokだけど、型が定まってないから指定する

  return (
    <Layout>
      <h1 className="mb-[20px] font-bold text-yellow-300 text-center">
        ブログ一覧
      </h1>
      <PostList posts={posts} />
      {/* //postsのデータをPostListのpostに渡して記事を一覧表示する */}
    </Layout>
  );
}
