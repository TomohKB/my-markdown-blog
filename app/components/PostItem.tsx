import Link from "next/link"; // ✅ Next.js の Link を使う
import Image from "next/image";
import { PostData } from "../../lib/posts";

interface PostItemProps {
  post: PostData;
}

export default function PostItem({ post }: PostItemProps) {
  return (
    <li className="mb-10 flex justify-center">
      <div className="max-w-2xl text-center">
        <Link href={`/posts/${post.id}`} className="text-white no-underline">
          <Image
            src={post.thumbnail}
            width={1000}
            height={500}
            alt={post.title}
            className="w-full rounded-lg" // ✅ 画像を幅いっぱいに、角を丸く
          />
        </Link>
        {/* ✅ タイトルを `Link` で囲んでクリックできるように */}
        <h3 className="text-xl font-bold mt-4">
          <Link
            href={`/posts/${post.id}`}
            className="text-blue-400 hover:underline"
          >
            {post.title}
          </Link>
        </h3>
        <p className="text-sm text-gray-400">{post.date}</p>
        <p className="text-base text-gray-300 mt-2">{post.excerpt}</p>{" "}
        {/* ✅ 記事要約の表示 */}
      </div>
    </li>
  );
}
