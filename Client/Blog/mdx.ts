// Mdx
import matter from "gray-matter";
import rehypeHighlight from "rehype-highlight";

import renderToString from "next-mdx-remote/render-to-string";
import readingTime from "reading-time";

// Components
import MdxComponents from "../Components/Blog/mdxComponents";

// Apollo
import { apolloClient } from "@Apollo/ssr";

// GraphQL
import { GetArticlesDocument, GetArticleDocument } from "@Graphql/index";

// ========================================================================================================

export async function getFiles() {
  const data = await apolloClient.query({
    query: GetArticlesDocument,
  });

  const gql = await data?.data.getArticles;

  return gql.map((value) => value.slug);
}

export async function getFileByPost({ post }) {
  const result = apolloClient.query({
    query: GetArticleDocument,
    variables: {
      productSlug: post,
    },
  });

  const article = await (await result).data.getArticle;

  const { data, content } = matter(article.content);

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

  return gql.reduce((allPosts, postSlug) => {
    return [
      {
        ...postSlug,
        slug: postSlug.slug,
      },
      ...allPosts,
    ];
  }, []);
}
