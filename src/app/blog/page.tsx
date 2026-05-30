import { getAllPostPairs } from "@/data/blog";
import BlogIndexClient from "./BlogIndexClient";

export default function BlogIndexPage() {
  const pairs = getAllPostPairs();
  return <BlogIndexClient pairs={pairs} />;
}
