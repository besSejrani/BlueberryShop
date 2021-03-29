import { getFileByPost, getFiles } from "../../Blog/mdx";

import hydrate from "next-mdx-remote/hydrate";
import MdxComponents from "../../Components/Blog/mdxComponents";

// Material-UI
import { Container } from "@material-ui/core";

// ========================================================================================================

export default function Blog({ mdxSource, frontMatter }) {
  const content = hydrate(mdxSource, {
    components: MdxComponents,
  });

  return <Container>{content}</Container>;
}

export const getStaticProps = async ({ params }) => {
  const post = await getFileByPost(params);

  return {
    props: post,
  };
};

export const getStaticPaths = async () => {
  const posts = await getFiles();

  return {
    paths: posts.map((post) => ({
      params: {
        post: post.replace(/\.mdx/, ""),
      },
    })),
    fallback: false,
  };
};
