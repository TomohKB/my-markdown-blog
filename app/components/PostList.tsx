import Link from "next/link";
import { PostData } from "../../lib/posts";
import PostItem from "./PostItem";

interface PostListProps {
  posts: PostData[];
}

export default function PostList({ posts }: PostListProps) {
  return (
    <ul>
      {posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </ul>
  );
}
