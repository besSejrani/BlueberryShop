import fs from "fs";
import path from "path";
import matter from "gray-matter";

import renderToString from "next-mdx-remote/render-to-string";
import readingTime from "reading-time";

import MdxComponents from "../Components/Blog/mdxComponents";

// ========================================================================================================

export async function getFiles() {
  const folderPath = path.join(process.cwd(), "Blog", "Content");

  return fs.readdirSync(folderPath);
}

export async function getFileByPost({ post }) {
  const source = fs.readFileSync(path.join(process.cwd(), "Blog", "Content", `${post}.mdx`), "utf8");

  const { data, content } = matter(source);

  const mdxSource = await renderToString(content, {
    components: MdxComponents,
  });

  return {
    mdxSource,
    frontMatter: {
      wordCount: content.split(/\s+/gu).length,
      readingTime: readingTime(content),
      post: post || null,
      ...data,
    },
  };
}

export async function getAllFilesFrontMatter() {
  const files = fs.readdirSync(path.join(process.cwd(), "Blog", "Content"));

  return files.reduce((allPosts, postSlug) => {
    const source = fs.readFileSync(path.join(process.cwd(), "Blog", "Content", postSlug), "utf8");
    const { data } = matter(source);

    return [
      {
        ...data,
        slug: postSlug.replace(".mdx", ""),
      },
      ...allPosts,
    ];
  }, []);
}
