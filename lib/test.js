import { getSortedPostsData, getPostData } from "./posts.js";

console.log(getSortedPostsData());
getPostData("first-post").then(console.log);
