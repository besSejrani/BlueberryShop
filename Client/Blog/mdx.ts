import fs from "fs";
import path from "path";
import matter from "gray-matter";
import rehypeHighlight from "rehype-highlight";

import renderToString from "next-mdx-remote/render-to-string";
import readingTime from "reading-time";

// Components
import MdxComponents from "../Components/Blog/mdxComponents";

// Apollo
import { apolloClient } from "@Apollo/ssr";

// GraphQL
import { GetArticlesDocument } from "@Graphql/index";

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
    mdxOptions: {
      remarkPlugins: [require("remark-autolink-headings"), require("remark-slug"), require("remark-code-titles")],
      rehypePlugins: [rehypeHighlight],
    },
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
  const data = await apolloClient.query({
    query: GetArticlesDocument,
  });

  const gql = await data?.data.getArticles;
  console.log(
    "grahql",
    gql.map((value) => value.slug)
  );

  const files = fs.readdirSync(path.join(process.cwd(), "Blog", "Content"));
  // console.log(
  //   "filessssssssssss",
  //   files.map((value) => value.content)
  // );

  // const bla = files.map((value) => value.content);

  // console.log("filesssssssss", files);

  return gql.reduce((allPosts, postSlug) => {
    // console.log("allposts", allPosts);
    // console.log("postslug", postSlug);

    // const source = fs.readFileSync(path.join(process.cwd(), "Blog", "Content", postSlug), "utf8");
    // const files = JSON.stringify(allPosts);

    // console.log("alllllllllPosts", allPosts);
    // console.log("postSluuugss", postSlug);

    // console.log(
    //   "exampleeeeeeeeeeeeeeeee",
    //   fs.readFileSync(path.join(process.cwd(), "Blog", "Content", "alex.mdx"), "utf8")
    // );

    // const { data } = matter(`${allPosts}`);

    // console.log("data frontmatter", data);

    return [
      {
        ...postSlug,
        slug: postSlug.slug,
      },
      ...allPosts,
    ];
  }, []);
}
