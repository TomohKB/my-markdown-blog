import Link from "next/link";
import Image from "next/image";
import { PostData } from "../../lib/posts";

interface PostItemProps {
  post: PostData;
}

export default function PostItem({ post }: PostItemProps) {
  return (
    <li style={{ marginBottom: "20px", listStyle: "none" }}>
      <Link
        href={`/posts/${post.id}`}
        style={{ textDecoration: "none", color: "white" }}
      >
        <Image src={post.thumbnail} 
            width={1000} height={500} alt={post.title} />
        <h3>{post.title}</h3>
        <p>{post.date}</p>
        <p style={{ fontSize: "14px", color: "#bbb" }}>{post.excerpt}</p>{" "}
        {/* 本文100文字を表示 */}
      </Link>
    </li>
  );
}
