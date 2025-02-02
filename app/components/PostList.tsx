import Link from "next/link";
import { PostData } from "../../lib/posts";
import PostItem from "./PostItem";

interface PostListProps {
  //interfaceはTypeScript における「型のルールを決める仕組み」
  posts: PostData[];
}

export default function PostList({ posts }: PostListProps) {
//✅ posts は PostListProps 型のデータを受け取る
// ✅ PostListProps には posts: PostData[] が指定されている
// ✅ だから posts には記事データの配列が必ず入る！
  return (
    <ul>
      {posts.map((post) => (
        //map():配列（リスト）のデータを1つずつ取り出して、何かの処理をするための関数
        <PostItem key={post.id} post={post} />
        //「記事データ posts を1つずつ取り出して、PostItem に渡して表示する！」 という処理
        //ey={post.id} をつけることで「これは first-post のデータ！」「これは second-post のデータ！」と明確
      ))}
    </ul>
  );
}
