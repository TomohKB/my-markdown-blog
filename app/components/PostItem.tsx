import Link from "next/link"; // ✅ Next.js の Link を使う
import Image from "next/image";
import { PostData } from "../../lib/posts"; //PostData 型（記事データの型）を読み込む

interface PostItemProps {
  post: PostData;
}

export default function PostItem({ post }: PostItemProps) {
  return (
    <li className="mb-10 flex justify-center">
      <div className="max-w-2xl text-center">
        <Link href={`/posts/${post.id}`} className="text-white no-underline">
          {/* //Linkでかこむとクリックできる */}
          {/* ✅ href="/posts/first-post" のように、記事ごとに異なる URL
          を生成する！ ✅ post.id */}
          {/* には、記事ごとの固有ID（URLの一部）が入っている！ */}
          <Image
            //importしてるもの
            src={post.thumbnail}
            width={1000}
            height={500}
            alt={post.title}
            className="w-full rounded-lg"
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
